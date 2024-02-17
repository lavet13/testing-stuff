import { memo, useState, useTransition, FC, ReactNode, Suspense } from 'react';
import TabButton from './tab-button';

let cache = new Map();

function fetchData(url: string) {
  if(!cache.has(url)) {
    cache.set(url, getData(url));
  }

  return cache.get(url);
}

async function getData(url: string) {
  if(url.startsWith('/posts')) {
    return await getPosts();
  } else {
    throw Error('Not implemented');
  }
}

type Post = {
  id: number;
  title: string;
};

async function getPosts() {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  let posts: Post[] = [];
  for(let i = 0; i < 500; i++) {
    posts.push({
      id: i,
      title: 'Post #' + (i + 1),
    });
  }

  return posts;
}

const TabContainer = () => {
  // const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  // function selectTab(nextTab: string) {
  //   startTransition(() => {
  //     setTab(nextTab);
  //   });
  // }

  const handleClick = (tab: string) => () => setTab(tab); // currying the function

  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
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
    </Suspense>
  );
};

export default TabContainer;

const AboutTab = () => <p>Welcome to my profile!</p>;

// const PostsTab = memo(() => {
//   console.log('[ARTIFICIALLLY SLOW] Rendering 500 <SlowPost />');
//
//   // const obj: Iterable<number | undefined> = {
//   //   [Symbol.iterator]() {
//   //     let i = 0;
//   //     return {
//   //       next() {
//   //         i++;
//   //         if(i === 1500) return {done: true, value: i};
//   //         return { done: false, value: i};
//   //       },
//   //       return() {
//   //         return { value: undefined, done: true };
//   //       },
//   //     };
//   //   }
//   // };
//
//   // function* slowPosts() {
//   //   let i = 0;
//   //
//   //   while(i <= 500) {
//   //     yield ++i;
//   //   }
//   // }
//   //
//   // const it = slowPosts();
//
//   // class MyIterator {
//   //   length: number;
//   //
//   //   constructor(data: number) {
//   //     this.length = data;
//   //   }
//   //
//   //   [Symbol.iterator]() {
//   //     let index = 0;
//   //
//   //     return {
//   //       next: () => {
//   //         index++;
//   //
//   //         if(index === this.length) return {value: index, done: true};
//   //
//   //         return {value: index, done: false};
//   //       },
//   //       return: () => {
//   //         return { value: undefined, done: true };
//   //       },
//   //     }
//   //   }
//   // }
//   // const it = new MyIterator(500);
//
//   // let items = Array.from(it, (_, i) => (<SlowPost key={i} index={i} />))
//
//   // const items = Array.from({ length: 500 }, (_, i) => (
//   //   <SlowPost key={i} index={i} />
//   // ));
//
//   let items: ReactNode[] = [];
//
//   for (let i = 0; i < 500; i++) {
//     items.push(<SlowPost key={i} index={i} />);
//   }
//
//   return <ul className='items'>{items}</ul>;
// });
//
// type SlowPostProps = {
//   index: number;
// };
//
// const SlowPost: FC<SlowPostProps> = ({ index }) => {
//   const startTime = performance.now();
//
//   // while (performance.now() - startTime < 1) {
//   //   // Do nothing for 1 ms per item to emulate extremely slow code
//   // }
//
//   return <li className='item'>Post #{index + 1}</li>;
// };

const ContactTab = () => (
  <>
    <p>You can find me online here:</p>
    <ul>
      <li>admin@mysite.com</li>
      <li>+123456789</li>
    </ul>
  </>
);

function PostsTab() {
  const posts = use(fetchData('/posts'));

  return (
    <ul>
      {posts.map(p => (
        <Post key={p.id} title={p.title} />
      ))}
    </ul>
  );
}

function Post({title}: {title: string}) {
  return (
    <li>{title}</li>
  );
}

// This is a workaround for a bug to get the demo running.
// TODO: replace with real implementation when the bug is fixed.
function use(promise: any) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },
    );
    throw promise;
  }
}



