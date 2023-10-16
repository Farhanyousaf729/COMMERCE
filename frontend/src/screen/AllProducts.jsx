import React from 'react'
import { useEffect, useState } from "react"
import { getProducts } from "../Slices/ProductSlice"
import { resetProductDetails, resetCreatedProduct } from "../Slices/ProducdetailSlice"
import { useDispatch, useSelector } from "react-redux"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';

const AllProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, products, error } = useSelector(state => state.products)
  const { totalproducts, totalPages, pagenumber } = products
  // const [page, setPage] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    rowsPerPage: 10
  });

  const { userInfo } = useSelector(state => state.user)

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    }
    const obj = {
      // catogry:undefined , pageNumber:undefined
    }

    dispatch(getProducts(obj))

  }, [userInfo])

  const productDetails = (id) => {

    navigate(`/adminpanel/allproducts/${id}`)

  }
  const productEdit = (id) => {
    dispatch(resetProductDetails())
    navigate(`/adminpanel/allproducts/edit/${id}`)

  }

  
  const handleCreateProduct = () => {
    dispatch(resetCreatedProduct())
    navigate('/adminpanel/allproducts/create')
  }


  const handleChangePage = (event, newPage) => {
    setPaginationModel({
      ...paginationModel,
      page: newPage
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginationModel({
      ...paginationModel,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    })
  };
  return (
    <div>
      {
        loading && <Looader />
      }
      {
        error && <AlertErr>{error}</AlertErr>
      }
      {
        products &&

        <>
          <Button onClick={handleCreateProduct} variant="outlined">Generate New Product</Button>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={1}>
                      Sr
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      ID
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      Name
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {totalproducts?.length > 0 && totalproducts
                    .map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => productDetails(row._id)} align="center">{row._id}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center"><Button variant='contained' color='error'>DEL</Button>  <Button onClick={() => productEdit(row._id)} variant="contained">Edit </Button></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 25]}
              component="div"
              count={totalproducts?.length}
              rowsPerPage={paginationModel.rowsPerPage}
              page={paginationModel.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

        </>
      }
    </div>
  )
}

export default AllProducts
