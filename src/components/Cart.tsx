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
import { Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Cart = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.cart.products)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity)

  const theme = createTheme()

  theme.typography.h6 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  }

  theme.typography.h5 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  }

  return (
    <Box sx={{ padding: '20px', marginRight: '20px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <ThemeProvider theme={theme}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    Product ID
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    Quantity
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    Discount
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    Discount Amount
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{}}>
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{product.title}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{product.quantity}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="h6">
                      {' '}
                      $ {product.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" color={'red'}>
                      {product.discountPercentage} %
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      ${' '}
                      {(
                        (product.discountPercentage / 100) *
                        product.price *
                        product.quantity
                      ).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center" rowSpan={3} />
                <TableCell align="center" colSpan={2}>
                  <Typography variant="h5" fontWeight={'bold'}>
                    Total Products Ordered
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    {totalQuantity}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <Typography variant="h5" fontWeight={'bold'}>
                    Total Payable
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" fontWeight={'bold'}>
                    $ {totalPrice.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </ThemeProvider>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Cart
