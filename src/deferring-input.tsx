import { FC, ReactNode, memo, useDeferredValue, useState } from 'react';

const DeferringInput: FC = () => {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
};

const SlowList: FC<{text: string}> = memo(({text}) => {
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  let items: ReactNode[] = [];

  for(let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }

  return (
    <ul>{items}</ul>
  );
});

const SlowItem: FC<{text: string}> = ({text}) => {
  let startTime = performance.now();

  while(performance.now() - startTime < 1) {
    // do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li>Text: {text}</li>
  );
};

export default DeferringInput;
