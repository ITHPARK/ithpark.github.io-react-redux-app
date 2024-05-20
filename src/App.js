import React, {useState} from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import Nav from './components/Nav';
import Product from './components/Product';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './css/reset.css'
import './css/components.css'


const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer/>
    </>
  );
};


function App() {

  return(
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Product/>}/>
        <Route path="cart" element={<Cart/>}/> 
        
      </Route>
    </Routes>
  )
  
}

export default App;
