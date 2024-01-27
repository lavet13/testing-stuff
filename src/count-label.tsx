import React, { FC, useState } from 'react';

type CountLabelProps = {
  count: string;
};

// Always check whether you can reset all state with a key or calculate
// everything during rendering instead.

const CountLabel: FC<CountLabelProps> = ({ count }) => {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState<string | null>(null);

  // it must be inside a condition (count !== prevCount)
  if (count !== prevCount) {
    // must be a call setPrevCount(count) inside the condition
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }

  return (
    <>
      {count}
      {trend && <p>The count is {trend}</p>}
    </>
  );
};

export default CountLabel;
