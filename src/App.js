import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login/index'
import Admin from './pages/Admin/index'
import { Routes } from 'react-router';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/*' element={<Admin/>}></Route>
          </Routes>
      </BrowserRouter>
    )
  }
}