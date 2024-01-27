import React, { FC, PropsWithChildren } from 'react';

type TabButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

const TabButton: FC<PropsWithChildren<TabButtonProps>> = ({
  onClick,
  isActive,
  children,
}) => {
  if (isActive) {
    return <b>{children}</b>;
  }

  const handleClick = () => onClick();

  return <button onClick={handleClick}>{children}</button>;
};

export default TabButton;
