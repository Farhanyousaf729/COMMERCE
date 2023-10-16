

import { Alert, Stack, Button, AlertTitle } from "@mui/material";

const AlertErr = ({ children }) => {


    return (

        <>
            {/* <div className="w-[80%] bg-red-500 py-2 font-semibold text-lg ">
                {children}
            </div> */}
            <Stack sx={{ width: '80%' }} spacing={2}>
                <Alert severity="error"

                    // action={
                    //     <Button color="inherit" size="small">
                    //         UNDO
                    //     </Button>}
                        
                        >
                    <AlertTitle>Error</AlertTitle>

                    {children}
                </Alert>

            </Stack>

        </>


    );



}
export default AlertErr