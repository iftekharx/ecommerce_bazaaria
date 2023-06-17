import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../intefaces/Product'

const initialState = {
  products: [] as Product[],
  totalQuantity: 0,
  discountedTotal: 0,
  currentProductId: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = []
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.id !== action.payload.id
      })
      console.log(action.payload.id)
      state.currentProductId = action.payload.id
      cartSlice.caseReducers.calculateTotals(state)
    },

    calculateTotals: (state) => {
      let c = 0
      let totalQ = 0
      let totalPrice = 0
      state.products.map((product) => {
        totalQ += product.quantity
        totalPrice +=
          product.price * product.quantity -
          product.quantity * product.price * (product.discountPercentage / 100)
      })

      state.totalPrice = totalPrice
      state.totalQuantity = totalQ

      console.log(totalQ, totalPrice)

      // state.totalQuantity += 1
      // state.totalPrice +=
      //   action.payload.price * (.discountPercentage / 100)
      // console.log(state.totalQuantity)
    },

    addProduct: (state, action) => {
      let found = false
      state.products.map((p) => {
        if (p.id === action.payload.id) {
          found = true
        }
      })
      if (found) {
        const existingProduct = state.products.find(
          (p) => p.id === action.payload.id
        )
        if (existingProduct) {
          existingProduct.quantity = existingProduct.quantity + 1
        }
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }
      console.log('added')
      // console.log(state.products)
      cartSlice.caseReducers.calculateTotals(state)
    },
  },
})

// console.log(cartSlice);
export const { clearProducts, removeProduct, calculateTotals, addProduct } =
  cartSlice.actions

export default cartSlice.reducer
