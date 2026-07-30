import React, { useState } from 'react';
import { useCart } from '../CartContext'; // تأكد من ضبط مسار الملف
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });

  // ⚠️ ضع رقم الواتساب الخاص بك هنا بالصيغة الدولية (بدون + أو أصفار زيادات)
  const WHATSAPP_NUMBER = "201000000000"; 

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let message = `🛍️ *طلب جديد من متجر خيوط*\n\n`;
    message += `👤 *الاسم:* ${customerInfo.name}\n`;
    message += `📞 *الهاتف:* ${customerInfo.phone}\n`;
    message += `📍 *العنوان:* ${customerInfo.address}\n\n`;
    message += `📦 *المنتجات:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - العدد: ${item.quantity} - السعر: ${item.price * item.quantity} ج.م\n`;
    });

    message += `\n💰 *الإجمالي الكلي:* ${totalPrice} ج.م`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 20px', color: '#fff' }}>
        <h2>سلتك فارغة حالياً 🛍️</h2>
        <p style={{ color: '#aaa', margin: '15px 0' }}>لم تقم بإضافة أي منتجات بعد.</p>
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#d4af37',
            color: '#000',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          تصفح المنتجات الان
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', color: '#fff', direction: 'rtl' }}>
      <h2 style={{ borderBottom: '2px solid #d4af37', paddingBottom: '10px' }}>🛒 سلة الشراء</h2>
      
      <div style={{ margin: '20px 0' }}>
        {cart.map((item) => (
          <div 
            key={item.id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          >
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <span style={{ color: '#d4af37' }}>{item.price} ج.م</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => updateQuantity(item.id, -1)} style={btnStyle}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} style={btnStyle}>+</button>
              <button onClick={() => removeFromCart(item.id)} style={{ ...btnStyle, backgroundColor: '#ff4d4d' }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
        <h3>إجمالي الفاتورة: <span style={{ color: '#d4af37' }}>{totalPrice} ج.م</span></h3>

        <form onSubmit={handleCheckout} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4>بيانات التوصيل:</h4>
          <input 
            type="text" 
            placeholder="الاسم بالكامل" 
            required 
            value={customerInfo.name} 
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            style={inputStyle}
          />
          <input 
            type="tel" 
            placeholder="رقم الهاتف" 
            required 
            value={customerInfo.phone} 
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            style={inputStyle}
          />
          <input 
            type="text" 
            placeholder="العنوان التفصيلي" 
            required 
            value={customerInfo.address} 
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            style={inputStyle}
          />

          <button 
            type="submit" 
            style={{
              backgroundColor: '#25D366',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            تأكيد الطلب عبر واتساب 💬
          </button>
        </form>
      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  width: '30px',
  height: '30px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #444',
  backgroundColor: '#222',
  color: '#fff',
  fontSize: '14px'
};
