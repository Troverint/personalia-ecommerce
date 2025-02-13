import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/content/Carousel'
import Geser from './components/content/Geser'
import Category from './components/content/Category'
import Product from './components/Product/Product'
import Footer from './components/content/Footer'

const Homepage = () => {
  return (
    <div className='flex flex-col items-center overflow-x-hidden'>
      <Geser/>
      <Category/>
      <Product/>
      <Footer/>
    </div>
  )
}

export default Homepage
