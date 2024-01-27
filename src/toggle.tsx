import React, { useEffect, useState } from 'react';

type ToggleProps = {
  isOn: boolean;
  onChange: (nextIsOn: boolean) => void;
};

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// ✅ Also good: the component is fully controlled by its parent
const Toggle = ({ isOn, onChange }) => {
  // const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  // useEffect(() => {
  //   onChange(isOn);
  // }, [isOn, onChange]);

  // const updateToggle = (nextIsOn: boolean) => {
  //   setIsOn(nextIsOn);
  //   onChange(nextIsOn);
  // };

  const handleClick = () => {
    onChange(!isOn);
  };

  const isCloserToRightEdge = () => {
    return getRandomArbitrary(1, 10) > 5;
  };

  const handleDragEnd = () => {
    if (isCloserToRightEdge()) {
      onChange(true);
    } else {
      onChange(false);
    }
  };
};

export default Toggle;
