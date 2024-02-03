import React, { FC, PropsWithChildren, useTransition } from 'react';

type TabButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

const TabButton: FC<PropsWithChildren<TabButtonProps>> = ({
  onClick,
  isActive,
  children,
}) => {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return <b>{children}</b>;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    startTransition(() => {
      onClick();
    });
  };

  return <button onClick={handleClick}>{children}</button>;
};

export default TabButton;
