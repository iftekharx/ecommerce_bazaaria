import React from 'react'
import Box from '@mui/material/Box/'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { loadCategories } from '../features/product/productSlice'
import { setMainCategory } from '../features/product/productSlice'
import ProductCategories from './ProductCategories'
import { Typography } from '@mui/material'
const Categories = () => {
  const user = useAppSelector((state) => state.product.currentUser)

  const [category, setCategory] = React.useState<string>('smartphones')
  const categories = useAppSelector((state) => state.product.categories)
  const dispatch = useAppDispatch()
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value as string
    setCategory(selectedCategory)

    dispatch(setMainCategory(selectedCategory))
    dispatch(loadCategories())
  }

  React.useEffect(() => {
    setCategory('smartphones')
    dispatch(setMainCategory('smartphones'))
    dispatch(loadCategories())
  }, [])

  React.useEffect(() => {
    dispatch(setMainCategory(category))
    dispatch(loadCategories())
  }, [category])

  const output = user ? (
    <Box sx={{ minWidth: 120, marginTop: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          sx={{ textAlign: 'center' }}
          onChange={(e) => {
            handleChange(e)
          }}
        >
          {categories.map((cat: string, index) => (
            <MenuItem key={index} value={cat}>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                {cat}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ProductCategories />
    </Box>
  ) : (
    <Typography variant="h3">
      You must log in to view product categories
    </Typography>
  )

  return output
}

export default Categories
