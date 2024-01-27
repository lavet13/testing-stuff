import React, { memo, useState, useTransition, FC } from 'react';
import TabButton from './tab-button';

const TabContainer = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const handleClick = (tab: string) => () => selectTab(tab);

  return (
    <>
      <TabButton isActive={tab === 'about'} onClick={handleClick('about')}>
        About
      </TabButton>

      <TabButton isActive={tab === 'posts'} onClick={handleClick('posts')}>
        Posts (slow)
      </TabButton>

      <TabButton isActive={tab === 'contact'} onClick={handleClick('contact')}>
        Contact
      </TabButton>
      <hr />

      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
};

const AboutTab = () => <p>Welcome to my profile!</p>;

const PostsTab = memo(() => {
  console.log('[ARTIFICIALLLY SLOW] Rendering 500 <SlowPost />');

  const obj: Iterable<number | undefined> = {
    [Symbol.iterator]() {
      let i = 0;
      return {
        next() {
          i++;
          if(i === 1500) return {done: true, value: i};
          return { done: false, value: i};
        },
        return() {
          return { value: undefined, done: true };
        },
      };
    }
  };

  let items = Array.from(obj, (_, i) => (<SlowPost key={i} index={i} />))

  // let items = Array.from({ length: 500 }, (_, i) => (
  //   <SlowPost key={i} index={i} />
  // ));

  // for (let i = 0; i < 500; i++) {
  //   items.push(<SlowPost key={i} index={i} />);
  // }

  return (
    <ul className='items'>
      {items.slice(0, 10)}
    </ul>
  );
});

type SlowPostProps = {
  index: number;
};

const SlowPost: FC<SlowPostProps> = ({ index }) => {
  let startTime = performance.now();

  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className='item'>Post #{index + 1}</li>;
};

const ContactTab = () => (
  <>
    <p>You can find me online here:</p>
    <ul>
      <li>admin@mysite.com</li>
      <li>+123456789</li>
    </ul>
  </>
);

export default TabContainer;
