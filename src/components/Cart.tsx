import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import Box from '@mui/material/Box'
const Cart = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.cart.products)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity)

  return (
    <Box sx={{ padding: '20px', marginRight: '20px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Quantity</TableCell>

              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Discount Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell align="center">{product.id}</TableCell>
                <TableCell align="center">{product.title}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>

                <TableCell align="center"> $ {product.price}</TableCell>
                <TableCell align="center">
                  {product.discountPercentage} %
                </TableCell>
                <TableCell align="center">
                  $
                  {(product.discountPercentage / 100) *
                    product.price *
                    product.quantity}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" rowSpan={3} />
              <TableCell align="center" colSpan={2}>
                Total Products Ordered
              </TableCell>
              <TableCell align="center">{totalQuantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Total Payable
              </TableCell>
              <TableCell align="center">$ {totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Cart
