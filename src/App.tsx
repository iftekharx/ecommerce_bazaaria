import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, Link } from 'react-router-dom'
import Products from './components/Products'
import LatestProducts from './components/LatestProducts'
import { useEffect } from 'react'
import { getProducts } from './features/product/productSlice'
import { useAppDispatch, useAppSelector } from './components/hooks/hooks'
import Cart from './components/Cart'
import Categories from './components/Categories'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Products />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>

      <footer></footer>
    </>
  )
}

export default App
