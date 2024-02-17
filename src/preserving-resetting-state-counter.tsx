import { FC, useState } from 'react';

import './preserving-counter-styles.css';

const PreservingCounter = () => {
  const [isPlayerA, setIsPlayerA] = useState(false);

  return (
    <div>
      {/* {isPlayerA && <Counter person="Taylor" />} */}
      {/* {!isPlayerA && <Counter person="Sarah" />} */}
      {isPlayerA ? (
        <Counter key='Taylor' person='Taylor' />
      ) : (
        <Counter key='Sarah' person='Sarah' />
      )}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
};

export default PreservingCounter;

const Counter: FC<{ isFancy?: boolean; person?: string }> = ({
  isFancy,
  person,
}) => {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person && `${person}'s score: `}
        {score}
      </h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
};
