import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../intefaces/Product'

const url = 'https://dummyjson.com/products'

const initialState = {
  products: [] as Product[],
  currentProduct: {},
  total: 0,
  skip: 0,
  limit: 100,
  isLoading: true,
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url)

      return resp.data['products']
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = []
    },

    setCurrentProduct: (state, action) => {
      const product = action.payload
      state.currentProduct = product
    },

    calculateTotals: (state) => {
      let total = 0
      state.products.forEach((item) => {
        total += 1
      })
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

// console.log(cartSlice);
export const {} = productSlice.actions

export default productSlice.reducer
