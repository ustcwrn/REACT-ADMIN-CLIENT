import React from 'react'
import { Routes,Navigate } from 'react-router-dom';
import { Route } from 'react-router';
import ProductHome from './home';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';


export default function Product() {
  return (
    <Routes>
      <Route path='/' element={<ProductHome />} />
      <Route path='/addupdate' element={<ProductAddUpdate />} />
      <Route path='/detail' element={<ProductDetail />} />
      {/* 重定向 */}
      <Route path='/*' element={<Navigate replace to='/product' />}/>
    </Routes>
  )
}
