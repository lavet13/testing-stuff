import { Suspense, type FC, useState, useTransition } from 'react';

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band,
    formed in Liverpool in 1960, that comprised
    John Lennon, Paul McCartney, George Harrison
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [
    {
      id: 13,
      title: 'Let It Be',
      year: 1970,
    },
    {
      id: 12,
      title: 'Abbey Road',
      year: 1969,
    },
    {
      id: 11,
      title: 'Yellow Submarine',
      year: 1969,
    },
    {
      id: 10,
      title: 'The Beatles',
      year: 1968,
    },
    {
      id: 9,
      title: 'Magical Mystery Tour',
      year: 1967,
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967,
    },
    {
      id: 7,
      title: 'Revolver',
      year: 1966,
    },
    {
      id: 6,
      title: 'Rubber Soul',
      year: 1965,
    },
    {
      id: 5,
      title: 'Help!',
      year: 1965,
    },
    {
      id: 4,
      title: 'Beatles For Sale',
      year: 1964,
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964,
    },
    {
      id: 2,
      title: 'With The Beatles',
      year: 1963,
    },
    {
      id: 1,
      title: 'Please Please Me',
      year: 1963,
    },
  ];
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}

function AlbumsGlimmer() {
  return (
    <div style={{width: '30%'}} className='glimmer-panel'>
      <div className='glimmer-line' />
      <div className='glimmer-line' />
      <div className='glimmer-line' />
    </div>
  );
}

export const Artist = () => {
  const [show, setShow] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setShow(s => !s);
    });
  };

  if (show) {
    return (
      <ArtistPage
        pending={pending}
        artist={{ id: 'the-beatles', name: 'The Beatles' }}
      />
    );
  } else {
    return <button {...(pending ? { style: { color: 'gray', outline: 'none' } } : {})} onClick={handleClick}>Open the Beatles artist page</button>;
  }
};

const Albums: FC<{ artistId: string }> = ({ artistId }) => {
  const albums = use(fetchData(`/${artistId}/albums`));

  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year}))
        </li>
      ))}
    </ul>
  );
};

function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));

  return (
    <section>
      <p className='bio'>{bio}</p>
    </section>
  );
}

const ArtistPage: FC<{ artist: any; pending: boolean }> = ({
  artist,
  pending,
}) => {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
};

function use(promise) {
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
