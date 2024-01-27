import React, { useEffect, useState } from 'react';

type ToggleProps = {
  onChange: (nextIsOn: boolean) => void;
};

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const Toggle = ({ onChange }) => {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  // useEffect(() => {
  //   onChange(isOn);
  // }, [isOn, onChange]);

  const updateToggle = (nextIsOn: boolean) => {
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  };

  const handleClick = () => {
    updateToggle(!isOn);
  };

  const isCloserToRightEdge = () => {
    return getRandomArbitrary(1, 10) > 5;
  };

  const handleDragEnd = () => {
    if (isCloserToRightEdge()) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  };
};

export default Toggle;
