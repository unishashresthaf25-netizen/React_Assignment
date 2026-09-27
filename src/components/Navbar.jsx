export default function Navbar({ view, onViewChange, favoritesCount, currentUser, onLoginClick, onSignupClick, onLogout }) {
  return (
    <header className="navbar">
      <span className="navbar-brand">Swad-Khoj</span> 
      

      <nav className="navbar-links">
        <button className={view === 'home' ? 'active' : ''} onClick={() => onViewChange('home')}>
          Home
        </button>
        <button className={view === 'favorites' ? 'active' : ''} onClick={() => onViewChange('favorites')}>
          Favorites ({favoritesCount})
        </button>
        <button className={view === 'about' ? 'active' : ''} onClick={() => onViewChange('about')}>
          About Us
        </button>
        <button className={view === 'contact' ? 'active' : ''} onClick={() => onViewChange('contact')}>
          Contact Us
        </button>
      </nav>
      

      <div className="navbar-auth">
        {currentUser ? (
          <>
            <span className="navbar-user">Hi, {currentUser.name}</span>
            <button className="auth-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="auth-btn" onClick={onLoginClick}>Login</button>
            <button className="auth-btn primary" onClick={onSignupClick}>Sign Up</button>
          </>
        )}
      </div>
      
    </header>
    
  );
}
