import React, {FC, useState} from 'react';

const Counter: FC = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        // You may have noticed that setState(5) actually works like
        // setState(n => 5), but n is unused!
        setNumber(number + 1);
        setNumber(n => n + 1);
      }}>increase the number</button>
    </>
  );
};

export default Counter;
