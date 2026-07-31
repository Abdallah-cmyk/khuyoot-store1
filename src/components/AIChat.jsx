import React, { useState } from 'react';

// جلب المفتاح بأمان من متغيرات البيئة
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `أنت مساعد متجر خيوط للملابس (Khuyoot Store). أجب بأسلوب راقٍ وودود ومختصر باللغة العربية. السؤال: ${userText}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botReply = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'عذراً، حدث خطأ في معالجة الإجابة.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي.' }
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
          {/* شريط العنوان */}
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

          {/* الرسائل */}
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
            {loading && <div style={{ color: '#d4af37', fontSize: '12px' }}>جاري التفكير...</div>}
          </div>

          {/* الإدخال */}
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
              disabled={loading}
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
