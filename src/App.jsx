import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import './index.css'

function App() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Сообщаем Телеграму, что приложение готово
    WebApp.ready();
    // Разворачиваем на весь экран
    WebApp.expand();

    // Пытаемся получить данные юзера (если запущен в ТГ)
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, [])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Эмуляция хедера Spotify */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>Music Genie</h2>
        {userData && (
          <div style={{ 
            width: '35px', 
            height: '35px', 
            borderRadius: '50%', 
            background: '#1DB954', // Spotify Green
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#000'
          }}>
            {userData.first_name[0]}
          </div>
        )}
      </div>

      {/* Карточка "Зумерский стиль" */}
      <div style={{
        background: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
        borderRadius: '20px',
        padding: '20px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        boxShadow: '0 10px 30px rgba(29, 185, 84, 0.3)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>Mix of the Day</h3>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>Based on your vibe</p>
      </div>

      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '20px' }}>Recently Played</h3>
        <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
            {/* Фейковые обложки для теста */}
            {[1, 2, 3].map(i => (
                <div key={i} style={{ 
                    minWidth: '100px', 
                    height: '100px', 
                    background: '#333', 
                    borderRadius: '12px' 
                }}></div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default App