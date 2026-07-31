import React, { useState } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'مرحباً بك في متجر خيوط! كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // إرسال السؤال إلى خادم الـ API أو الدالة الخاصة بك
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await res.json();

      setMessages(prev => [...prev, { sender: 'bot', text: data.reply || 'حدث خطأ، يرجى المحاولة لاحقاً.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'عذراً، تعذر الاتصال بالمساعد حالياً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#d4af37', // لون ذهبي يتناسب مع المتجر
            color: '#000',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          💬
        </button>
      ) : (
        <div style={{
          width: '320px',
          height: '450px',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          border: '1px solid #333'
        }}>
          {/* Header */}
          <div style={{ padding: '15px', background: '#262626', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, color: '#d4af37' }}>مساعد خيوط الذكي</h4>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>

          {/* Messages Box */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#d4af37' : '#333',
                color: msg.sender === 'user' ? '#000' : '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                maxWidth: '80%',
                fontSize: '14px'
              }}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ fontSize: '12px', color: '#888' }}>جاري التفكير...</div>}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #333', padding: '10px' }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              style={{ flex: 1, background: '#262626', border: 'none', color: '#fff', padding: '8px', borderRadius: '4px', outline: 'none' }}
            />
            <button type="submit" style={{ backgroundColor: '#d4af37', border: 'none', color: '#000', padding: '8px 12px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>إرسال</button>
          </form>
        </div>
      )}
    </div>
  );
}
