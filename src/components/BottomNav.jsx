import { Home, Search, Library, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'rgba(20, 20, 20, 0.85)', // Полупрозрачный черный
    backdropFilter: 'blur(20px)',         // Эффект стекла Apple
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
    paddingBottom: '15px' // Отступ для iPhone (Home bar)
  };

  const itemStyle = (isActive) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: isActive ? '#1DB954' : '#b3b3b3', // Зеленый если активен, серый если нет
    fontSize: '10px',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  });

  return (
    <div style={navStyle}>
      <button style={itemStyle(activeTab === 'home')} onClick={() => setActiveTab('home')}>
        <Home size={24} />
        <span>Home</span>
      </button>
      
      <button style={itemStyle(activeTab === 'search')} onClick={() => setActiveTab('search')}>
        <Search size={24} />
        <span>Search</span>
      </button>

      <button style={itemStyle(activeTab === 'library')} onClick={() => setActiveTab('library')}>
        <Library size={24} />
        <span>Library</span>
      </button>
    </div>
  );
};

export default BottomNav;