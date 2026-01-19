import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Heart } from 'lucide-react';

// 👇 ВСТАВЬ СЮДА СВОЙ TЕКУЩИЙ NGROK URL 👇
const API_URL = "https://tawanda-coachable-charlena.ngrok-free.dev"; 

const MiniPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Автозапуск при смене трека
  useEffect(() => {
    if (track && audioRef.current) {
      // Сбрасываем плеер к началу
      setIsPlaying(true);
      
      // Если это Spotify/iTunes трек, у него ID вида "spotify:...", 
      // API пока может не переварить это без доп. логики. 
      // Но если это YouTube трек (без двоеточия), всё будет ок.
      // На будущее: нам надо будет научить API понимать "spotify:..." ID.
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!track) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '10px',
      right: '10px',
      height: '60px',
      background: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.6)',
      zIndex: 90,
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {/* --- АУДИО ДВИЖОК --- */}
      {/* Мы передаем ID трека в API, который вернет поток */}
      <audio 
        ref={audioRef}
        src={`${API_URL}/stream/${track.id}`}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Обложка */}
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%',
        background: '#333',
        backgroundImage: `url(${track.meta_pkg?.meta?.cover || "https://placehold.co/100/333/fff?text=♪"})`,
        backgroundSize: 'cover',
        marginRight: '12px',
        flexShrink: 0,
        animation: isPlaying ? 'spin 10s linear infinite' : 'none',
        border: '1px solid rgba(255,255,255,0.1)'
      }}></div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      {/* Инфо */}
      <div style={{ flex: 1, overflow: 'hidden', marginRight: '10px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title}
        </div>
        <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
          {track.uploader || "Artist"}
        </div>
      </div>

      {/* Кнопки */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Heart size={20} color={track.liked ? '#1DB954' : '#fff'} />
        
        <div onClick={togglePlay} style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '50%',
            color: 'black'
        }}>
          {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" style={{ marginLeft: '2px' }} />}
        </div>
      </div>

      {/* Прогресс-бар */}
      <div style={{
        position: 'absolute', bottom: 0, left: '12px', right: '12px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden'
      }}>
        <div style={{
            width: isPlaying ? '100%' : '0%',
            transition: isPlaying ? 'width 30s linear' : 'none', // Простая эмуляция
            height: '100%', background: '#1DB954', borderRadius: '2px'
        }}></div>
      </div>
    </div>
  );
};

export default MiniPlayer;