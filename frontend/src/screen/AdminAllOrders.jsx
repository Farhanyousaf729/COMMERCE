import React from 'react'
import { useState, useEffect } from "react"
import { Allorders, DeliverOrder } from "../Slices/AdminSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';

const AdminAllOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.user)
    const { allordersloading, allorders, allordersError, deliverOrderloading, deliverOrder, deliverOrderError } = useSelector(state => state.admin)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        const id = null
        const obj = { userInfo, id }

        dispatch(Allorders(obj))
    }, [userInfo, deliverOrder, dispatch])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDelivered = (id) => {

        const obj = { userInfo, id }
        dispatch(DeliverOrder(obj))
    }
    return (
        <>

            {
                allordersError && <AlertErr>{allordersError}</AlertErr>
            }
            {
                deliverOrderError && <AlertErr>{deliverOrderError}</AlertErr>
            }
            {
                allordersloading ? <Looader /> : deliverOrderloading ? <Looader /> :



                    <Paper sx={{ width: '100%' }}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={1}>
                                            Date
                                        </TableCell>
                                        <TableCell align="center" colSpan={1}>

                                            Order #
                                        </TableCell>
                                        <TableCell align="center" colSpan={1}>
                                            Buyer Name
                                        </TableCell>
                                        <TableCell align="center" colSpan={1}>
                                            Status
                                        </TableCell>
                                        <TableCell align="center" colSpan={1}>
                                            Delivered
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allorders && allorders.length > 0 && allorders.slice().reverse()
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                    <TableCell align="center">{row.createdAt.split('T')[0]}</TableCell>
                                                    <TableCell align="center">{row.paymentResult.id}</TableCell>
                                                    <TableCell align="center">{row.shippingAddre.name}</TableCell>
                                                    <TableCell align="center">{!row.isDelivered ? "Proccessing" : "Delivered"}</TableCell>
                                                    <TableCell align="center"><Button onClick={() => handleDelivered(row._id)} variant="contained" color={!row.isDelivered ? "error" : "success"}>{!row.isDelivered ? "needAction" : "Delivered"}</Button></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={allorders?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                    </Paper>
            }
        </>
    );

}

export default AdminAllOrders   
