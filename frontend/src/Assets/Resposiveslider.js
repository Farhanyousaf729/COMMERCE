import { useState, useEffect } from "react"

const Resposiveslider = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [stateAtBreakpoint, setStateAtBreakpoint] = useState('');

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        // console.log(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // console.log(windowWidth);
    useEffect(() => {
        if (windowWidth < 640) {
            setStateAtBreakpoint(2)
        } else if (windowWidth < 769) {
            setStateAtBreakpoint(3);
        } else if (windowWidth < 1280) {
            setStateAtBreakpoint(4);
        }
        else if (windowWidth < 1500) {
            setStateAtBreakpoint(5);
        }
        
        else {
            setStateAtBreakpoint(6);
        }
    }, [windowWidth]);

    return stateAtBreakpoint
}

export default Resposiveslider


