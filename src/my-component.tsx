import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const myRef = useRef<string>(null);

  useEffect(() => {
    console.log({ ref: myRef.current });
    myRef.current = 'Hello, useRef!';
    console.log('Component mounted');

    return () => {
      console.log('Component unmounted');
      console.log('Value stored in useRef:', myRef.current);
    };
  }, []);

  return <div>{myRef.current}</div>;
};

export default MyComponent;
