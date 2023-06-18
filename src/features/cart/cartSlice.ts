import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../intefaces/Product'

const productsLoadedString = localStorage.getItem('products')
const totalQuantityString = localStorage.getItem('totalQuantity')
const totalPriceString = localStorage.getItem('totalPrice')

const productsLoaded: Product[] = productsLoadedString
  ? JSON.parse(productsLoadedString)
  : []
const totalQuantityLoaded: number = totalQuantityString
  ? JSON.parse(totalQuantityString)
  : 0
const totalPriceLoaded: number = totalPriceString
  ? JSON.parse(totalPriceString)
  : 0

const initialState = {
  products: productsLoaded,
  totalQuantity: totalQuantityLoaded,
  discountedTotal: 0,
  currentProductId: 0,
  totalPrice: totalPriceLoaded,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadLocalStorage: (state) => {
      const productsLoadedString = localStorage.getItem('products')
      const productsLoaded: Product[] = productsLoadedString
        ? JSON.parse(productsLoadedString)
        : []
      state.products = productsLoaded
    },
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
      localStorage.setItem('products', JSON.stringify(state.products))
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity))
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice))
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
      // console.log('added')
      // console.log(state.products)
      cartSlice.caseReducers.calculateTotals(state)
      localStorage.clear()
      localStorage.setItem('products', JSON.stringify(state.products))
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity))
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice))
    },
  },
})

// console.log(cartSlice);
export const {
  clearProducts,
  loadLocalStorage,
  removeProduct,
  calculateTotals,
  addProduct,
} = cartSlice.actions

export default cartSlice.reducer
