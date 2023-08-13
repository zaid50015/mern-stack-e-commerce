import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'
const ProductDetailPage = () => {
  return (
    <div>
  <Navbar>
    <ProductDetail></ProductDetail>
  </Navbar>
  </div>
  )
}

export default ProductDetailPage