import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  useEffect(() => {
    function onDoc(e){
      if(!menuRef.current) return;
      if(!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e){ if(e.key === 'Escape'){ setOpen(false); setSearchOpen(false);} }
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  },[]);

  return (
    <header className="fixed w-full z-40">
      <div className="backdrop-blur-lg border-b border-indigo-500/30 bg-slate-950/95 shadow-[0_20px_40px_-24px_rgba(99,102,241,0.3)]">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-3">

          {/* LEFT: logo */}
          <div className="flex items-center gap-3 flex-1 min-w-[180px]">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/40">MB</div>
              <div className="hidden sm:block">
                <div className="text-white text-lg font-bold">MovieBook</div>
                <div className="text-indigo-300 font-medium text-sm">Book. Watch. Enjoy.</div>
              </div>
            </Link>
          </div>

          {/* CENTER: navigation (desktop) */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <NavLink to="/" className={({isActive}) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/60 shadow-lg shadow-indigo-500/10' : 'text-gray-100 hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent'}`}>
              Home
            </NavLink>
            <NavLink to="/my-bookings" className={({isActive}) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/60 shadow-lg shadow-indigo-500/10' : 'text-gray-100 hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent'}`}>
              My Bookings
            </NavLink>
            <NavLink to="/" className={({isActive}) => `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/60 shadow-lg shadow-indigo-500/10' : 'text-gray-100 hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent'}`}>
              Explore
            </NavLink>
          </nav>

          {/* RIGHT: search + actions */}
          <div className="flex items-center gap-2 justify-end flex-1 min-w-[180px]">
            {/* Search Desktop */}
            <div className="hidden md:flex items-center w-full max-w-xs lg:max-w-md">
              <div className="flex w-full items-center gap-3 rounded-xl border border-indigo-500/40 bg-slate-900/80 px-3 py-2 shadow-inner shadow-indigo-500/10 hover:border-indigo-500/60 transition-all focus-within:border-indigo-500 focus-within:bg-slate-900">
                <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input aria-label="Search movies" placeholder="Search movies..." className="w-full bg-transparent outline-none text-sm text-gray-100 placeholder:text-gray-500" />
              </div>
            </div>

            {/* Search Mobile Button */}
            <button title="Toggle search" onClick={() => setSearchOpen(s => !s)} className="md:hidden p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Notifications */}
            <button title="Notifications" className="hidden md:inline-flex p-2.5 rounded-lg bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 border border-pink-500/30 transition-all relative">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>

            {user ? (
              <>
                <button className="hidden md:inline-flex rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-pink-600 transition-all" onClick={() => navigate('/my-bookings')}>My Bookings</button>
                
                {/* Avatar Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button onClick={() => setOpen(o => !o)} aria-haspopup="menu" aria-expanded={open} className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all">
                    {user.name?.[0] || 'U'}
                  </button>
                  {open && (
                    <div role="menu" aria-label="User menu" className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-indigo-500/40 bg-slate-900/95 shadow-2xl shadow-indigo-500/20 backdrop-blur-sm">
                      <div className="px-4 py-3 border-b border-indigo-500/20 bg-indigo-500/5">
                        <p className="text-sm font-bold text-indigo-200">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                      </div>
                      <Link to="/profile" role="menuitem" className="block px-4 py-3 text-sm text-gray-100 hover:bg-indigo-500/10 hover:text-indigo-300 transition-all">⚙️ Profile Settings</Link>
                      <button onClick={handleLogout} role="menuitem" className="w-full text-left px-4 py-3 text-sm text-pink-300 hover:bg-pink-500/10 transition-all">🚪 Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-3 py-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-all shadow-lg shadow-indigo-500/25">Sign Up</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Open main menu">{open ? '✕' : '☰'}</button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="rounded-lg border border-indigo-500/40 bg-slate-900/80 px-3 py-2 shadow-inner shadow-indigo-500/10">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input aria-label="Search movies" placeholder="Search movies..." className="w-full bg-transparent text-sm text-gray-100 outline-none placeholder:text-gray-500" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-slate-950 border-t border-indigo-500/20 px-4 py-3">
            <nav className="flex flex-col gap-1.5" aria-label="Mobile main navigation">
              <NavLink to="/" className={({isActive}) => `px-4 py-3 rounded-lg text-sm font-semibold transition-all ${isActive ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/50' : 'text-gray-100 hover:text-indigo-300 hover:bg-indigo-500/10'}`}>
                🏠 Home
              </NavLink>
              <NavLink to="/my-bookings" className={({isActive}) => `px-4 py-3 rounded-lg text-sm font-semibold transition-all ${isActive ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/50' : 'text-gray-100 hover:text-indigo-300 hover:bg-indigo-500/10'}`}>
                🎟️ My Bookings
              </NavLink>
              {user ? (
                <>
                  <Link to="/profile" className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-100 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all">⚙️ Profile</Link>
                  <button onClick={handleLogout} className="w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-pink-300 hover:bg-pink-500/10 transition-all">🚪 Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-3 rounded-lg text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-all">📱 Login</Link>
                  <Link to="/register" className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-center text-sm font-semibold hover:from-indigo-600 hover:to-pink-600 transition-all">✨ Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

