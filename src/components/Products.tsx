import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { addProduct, calculateTotals } from '../features/cart/cartSlice'
import { Product } from '../intefaces/Product'
const Products = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.products)
  const isLoading = useAppSelector((state) => state.product.isLoading)

  const addProductToCart = (product: Product) => {
    dispatch(addProduct(product))
  }

  return !isLoading ? (
    <div>
      <Grid container padding={10} spacing={10}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: 'lightyellow',

                maxWidth: 400,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: 'blue',
                      borderRadius: '3px',
                      width: '150px',
                    }}
                    aria-label="recipe"
                  >
                    {product.brand}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={product.title}
              />
              <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt="product image"
              />
              <CardContent>
                <Typography variant="body2" color="black">
                  {[product.description]}
                </Typography>
                <Typography variant="h4" color="red">
                  ${[product.price]}
                </Typography>
                <Typography variant="h6" color="darkred">
                  {[product.discountPercentage]}% off!
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => {
                    addProductToCart(product)
                  }}
                  aria-label="Add to cart"
                >
                  <AddIcon color="success" />
                </IconButton>

                <Button>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <Typography variant="h3" sx={{ textAlign: 'center' }}>
      Loading . . .{' '}
    </Typography>
  )
}

export default Products
