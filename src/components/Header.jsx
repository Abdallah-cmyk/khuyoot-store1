import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Header = ({ cartCount = 0 }) => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-slate-900/90 text-white border-slate-800' : 'bg-white/90 text-slate-800 border-slate-100'
    } backdrop-blur-md border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* الشعار - Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wider hover:opacity-80 transition-opacity">
            <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
              خُيوط | Khuyoot
            </span>
          </Link>

          {/* روابط التصفح - Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-amber-500 transition-colors">الرئيسية</Link>
            <Link to="/shop" className="hover:text-amber-500 transition-colors">المتجر</Link>
          </nav>

          {/* الأزرار والأدوات - Actions */}
          <div className="flex items-center gap-4">
            
            {/* زر التبديل بين الوضع الليلي والنهاري */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title="تغيير المظهر"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* أيقونة سلة الشراء */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-slate-500/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

