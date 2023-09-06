import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'
import Footer from '../features/common/Footer'
const ProductDetailPage = () => {
  return (
    <div>
  <Navbar>
    <ProductDetail></ProductDetail>
  </Navbar>
  <Footer></Footer>
  </div>
  )
}

export default ProductDetailPage