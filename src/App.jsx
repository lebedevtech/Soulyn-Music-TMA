import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import './index.css'
import BottomNav from './components/BottomNav' // Импортируем наше меню

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    // Красим шапку телеграма в черный, чтобы сливалась с приложением
    WebApp.setHeaderColor('#000000'); 
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, [])

  // --- ЭКРАНЫ ---
  
  const renderHome = () => (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Хедер */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Good Evening</h2>
        {userData && (
           <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
             {userData.first_name[0]}
           </div>
        )}
      </div>

      {/* Большая карточка */}
      <div style={{
        background: 'linear-gradient(135deg, #1DB954 0%, #104922 100%)',
        borderRadius: '16px',
        padding: '20px',
        height: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: '30px',
        boxShadow: '0 8px 20px rgba(29, 185, 84, 0.3)'
      }}>
        <span style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Featured</span>
        <h3 style={{ margin: '5px 0 0 0', fontSize: '22px' }}>Mix of the Day</h3>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '14px' }}>Curated for {userData ? userData.first_name : 'you'}</p>
      </div>

      {/* Горизонтальный скролл */}
      <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Recently Played</h3>
      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ flexShrink: 0, width: '120px' }}>
                <div style={{ width: '100%', height: '120px', background: '#222', borderRadius: '12px', marginBottom: '8px' }}></div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>Track Name {i}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Artist</div>
            </div>
        ))}
      </div>
    </div>
  )

  const renderSearch = () => (
    <div style={{ padding: '20px', paddingTop: '10px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>Search</h2>
      
      {/* Поисковая строка Apple Style */}
      <div style={{ 
        background: '#1c1c1e', 
        padding: '12px 15px', 
        borderRadius: '12px', 
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <span style={{ marginRight: '10px' }}>🔍</span>
        <input 
          type="text" 
          placeholder="Artists, Songs, Lyrics..." 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'white', 
            fontSize: '16px', 
            width: '100%', 
            outline: 'none' 
          }}
        />
      </div>

      <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Browse Categories</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
         {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Jazz', 'Workout'].map(genre => (
             <div key={genre} style={{ 
                 height: '100px', 
                 background: '#333', 
                 borderRadius: '12px', 
                 padding: '10px',
                 fontWeight: 'bold',
                 fontSize: '16px'
             }}>
                 {genre}
             </div>
         ))}
      </div>
    </div>
  )

  const renderLibrary = () => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
       <div style={{ fontSize: '40px', marginBottom: '20px' }}>🎵</div>
       <h3>Your Library</h3>
       <p style={{ color: '#888', textAlign: 'center' }}>Log in to see your playlists and saved tracks.</p>
       <button style={{ 
           marginTop: '20px', 
           padding: '15px 40px', 
           borderRadius: '30px', 
           background: 'white', 
           color: 'black', 
           border: 'none', 
           fontWeight: 'bold',
           fontSize: '16px'
       }}>
           Sign In
       </button>
    </div>
  )

  return (
    <>
      {activeTab === 'home' && renderHome()}
      {activeTab === 'search' && renderSearch()}
      {activeTab === 'library' && renderLibrary()}
      
      {/* Навигация */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}

export default App