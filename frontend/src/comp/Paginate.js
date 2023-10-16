import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom"
const Paginate = (props) => {
    const navigate = useNavigate()
    const {totalPages , pagenumber , catogry , keyword} = props;
    // console.log(pagenumber);
    const handleChange = (e , newPage) => {
        //  console.log( newPage);
         navigate (`${ keyword ? `/search/${keyword}/${newPage}`:`/products/${catogry}/${newPage}` }`)
    }
    return (
        <Stack spacing={2}>
            <Pagination onChange={handleChange} count={totalPages} page={pagenumber}  color="primary" variant="outlined" shape="rounded" />
        </Stack>
    )
}

export default Paginate
