import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import './index.css'
import BottomNav from './components/BottomNav'
import MiniPlayer from './components/MiniPlayer'
import { Search as SearchIcon, Loader } from 'lucide-react'

// 👇 ТВОЙ АДРЕС NGROK (Обязательно проверь, чтобы он совпадал с тем, что в терминале)
const API_URL = "https://tawanda-coachable-charlena.ngrok-free.dev";

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [userData, setUserData] = useState(null)
  
  // Состояния для поиска
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Плеер
  const [currentTrack, setCurrentTrack] = useState(null)

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    try { WebApp.setHeaderColor('#000000'); } catch (e) {}
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, [])

  // --- ФУНКЦИЯ ПОИСКА ---
const searchMusic = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
        // 👇 ДОБАВЛЯЕМ HEADER, ЧТОБЫ NGROK НЕ РУГАЛСЯ
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
            headers: {
                "ngrok-skip-browser-warning": "true" 
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data);
    } catch (error) {
        console.error("Ошибка поиска:", error);
        // Покажем реальную ошибку в алерте, чтобы понять причину
        alert(`Ошибка: ${error.message}`); 
    } finally {
        setIsSearching(false);
    }
  }

  // Обработчик нажатия Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        searchMusic();
    }
  }

  // Обработчик клика по треку
  const playTrack = (track) => {
    setCurrentTrack({
        title: track.title,
        artist: track.uploader || "Unknown Artist",
        cover: track.meta_pkg?.meta?.cover || "https://placehold.co/600x600/1DB954/white?text=Music", // Заглушка, если нет обложки
        liked: false
    })
  }

  // --- ЭКРАНЫ ---
  const renderHome = () => (
    <div style={{ padding: '20px', paddingBottom: '150px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Good Evening</h2>
        {userData && (
           <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
             {userData.first_name[0]}
           </div>
        )}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #1DB954 0%, #104922 100%)',
        borderRadius: '16px', padding: '20px', height: '180px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '30px', position: 'relative'
      }}>
        <div>
            <span style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase', fontWeight: 'bold' }}>Featured</span>
            <h3 style={{ margin: '5px 0 0 0', fontSize: '22px', fontWeight: '800' }}>Mix of the Day</h3>
            <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '13px' }}>Curated for {userData ? userData.first_name : 'you'}</p>
        </div>
      </div>
    </div>
  )

  const renderSearch = () => (
    <div style={{ padding: '20px', paddingTop: '10px', paddingBottom: '150px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', marginTop: 0 }}>Search</h2>
      
      {/* Поле ввода */}
      <div style={{ background: '#1c1c1e', padding: '12px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <SearchIcon size={20} style={{ marginRight: '10px', color: '#888' }} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Artists, Songs, Lyrics..." 
          style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '16px', width: '100%', outline: 'none' }}
        />
        {isSearching && <Loader size={20} className="spin" />}
      </div>

      {/* Результаты поиска */}
      {searchResults.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {searchResults.map((track) => (
                  <div key={track.id} onClick={() => playTrack(track)} style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                      {/* Обложка */}
                      <div style={{ 
                          width: '50px', height: '50px', borderRadius: '8px', background: '#333', 
                          backgroundImage: `url(${track.meta_pkg?.meta?.cover})`, backgroundSize: 'cover' 
                      }}></div>
                      {/* Инфо */}
                      <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', fontSize: '15px', color: currentTrack?.title === track.title ? '#1DB954' : 'white' }}>
                              {track.title}
                          </div>
                          <div style={{ fontSize: '13px', color: '#b3b3b3' }}>
                              {track.uploader || "Artist"}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      ) : (
          /* Жанры (показываем, если нет результатов) */
          <>
            <h3 style={{ fontSize: '17px', marginBottom: '15px', fontWeight: '700' }}>Browse Categories</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Jazz', 'Workout'].map((genre, index) => (
                    <div key={genre} style={{ height: '90px', background: `hsl(${200 + index * 20}, 60%, 25%)`, borderRadius: '8px', padding: '12px', fontWeight: '800', fontSize: '16px' }}>
                        {genre}
                    </div>
                ))}
            </div>
          </>
      )}
    </div>
  )

  const renderLibrary = () => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
       <div style={{ fontSize: '50px', marginBottom: '20px', opacity: 0.5 }}>🎵</div>
       <h3>Your Library</h3>
       <p style={{ color: '#888', textAlign: 'center' }}>Log in to see your playlists.</p>
    </div>
  )

  return (
    <>
      {activeTab === 'home' && renderHome()}
      {activeTab === 'search' && renderSearch()}
      {activeTab === 'library' && renderLibrary()}
      
      <MiniPlayer track={currentTrack} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}

export default App