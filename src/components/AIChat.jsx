import React, { useState } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'أهلاً بك في متجر خيوط! 🧵 كيف يمكنني مساعدتك في اختيار ملابسك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      // إرسال الطلب إلى السيرفر الخفي/الباك إند
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.reply || 'تم استلام سؤالك!' }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'عذراً، حدث خطأ في الاتصال بالمساعد.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999, direction: 'rtl' }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#d4af37',
            color: '#000',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🤖</span>
          <span>مساعد خيوط</span>
        </button>
      ) : (
        <div style={{
          width: '330px',
          height: '460px',
          backgroundColor: '#141414',
          border: '1px solid #d4af37',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          overflow: 'hidden'
        }}>
          {/* شريط العنوان العلوي */}
          <div style={{
            padding: '14px 16px',
            backgroundColor: '#1f1f1f',
            borderBottom: '1px solid #2a2a2a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#d4af37', fontWeight: 'bold' }}>🤖 مساعد خيوط الذكي</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '18px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* قائمة الرسائل */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-start' : 'flex-end',
                  backgroundColor: m.sender === 'user' ? '#d4af37' : '#262626',
                  color: m.sender === 'user' ? '#000' : '#fff',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '82%',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && <div style={{ color: '#888', fontSize: '12px' }}>جاري الكتابة...</div>}
          </div>

          {/* حقل الإدخال */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #2a2a2a', padding: '10px', gap: '6px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل عن المنتجات والمقاسات..."
              style={{
                flex: 1,
                backgroundColor: '#222',
                border: '1px solid #333',
                color: '#fff',
                padding: '10px',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '13px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#d4af37',
                color: '#000',
                border: 'none',
                padding: '0 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              إرسال
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
