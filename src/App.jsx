import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import AIChat from './components/AIChat.jsx'; // 👈 1. تم إضافة استدعاء المساعد هنا

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <AIChat /> {/* 👈 2. تم إضافة مكون الشات العائم هنا */}
    </ThemeProvider>
  );
}
