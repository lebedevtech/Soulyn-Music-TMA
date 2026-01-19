import { Play, SkipForward, Heart } from 'lucide-react';

const MiniPlayer = ({ track }) => {
  if (!track) return null; // Если трек не выбран, плеер не показываем

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px', // Отступ снизу (чтобы быть над меню)
      left: '10px',
      right: '10px',
      height: '60px',
      background: 'rgba(30, 30, 30, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
      zIndex: 90,
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {/* Обложка */}
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '6px', 
        background: '#333',
        backgroundImage: `url(${track.cover})`,
        backgroundSize: 'cover',
        marginRight: '12px',
        flexShrink: 0
      }}></div>

      {/* Инфо */}
      <div style={{ flex: 1, overflow: 'hidden', marginRight: '10px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title}
        </div>
        <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
          {track.artist}
        </div>
      </div>

      {/* Кнопки */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Heart size={20} color={track.liked ? '#1DB954' : '#fff'} />
        <Play size={24} fill="white" />
      </div>

      {/* Фейковый прогресс-бар снизу */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '12px',
        right: '12px',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px'
      }}>
        <div style={{
            width: '35%', // Типа играет
            height: '100%',
            background: '#fff',
            borderRadius: '2px'
        }}></div>
      </div>
    </div>
  );
};

export default MiniPlayer;