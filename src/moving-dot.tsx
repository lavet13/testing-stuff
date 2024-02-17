import { useState, type FC } from 'react';

const MovingDot: FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  console.log([position.x, position.y]);

  return (
    <div
      onPointerMove={e => setPosition({ x: e.clientX, y: e.clientY })}
      style={{ position: 'fixed', width: '100vw', height: '100vh' }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -4,
          top: -10,
          width: 20,
          height: 20,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default MovingDot;
