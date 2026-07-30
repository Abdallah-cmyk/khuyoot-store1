import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. أضفنا استيراد الموجه هنا
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. قمنا بتغليف المكون App هنا */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
