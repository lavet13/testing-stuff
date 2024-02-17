import React, { FC, Suspense, useDeferredValue, useState } from 'react';

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/search?q=')) {
    return await getSearchResults(url.slice('/search?q='.length));
  } else {
    throw Error('Not implemented');
  }
}

async function getSearchResults(query) {
  // Add a fake delay to make waiting noticeable.
  console.log('fetching shit');

  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  const allAlbums = [
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

  const lowerQuery = query.trim().toLowerCase();

  return allAlbums.filter(album => {
    const lowerTitle = album.title.toLowerCase();
    return (
      lowerTitle.startsWith(lowerQuery) ||
      lowerTitle.indexOf(' ' + lowerQuery) !== -1
    );
  });
}

export const SearchBox = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <Suspense fallback={<h2>Loading . . .</h2>}>
          <div
            style={{
              opacity: isStale ? 0.5 : 1,
              transition: isStale
                ? 'opacity 0.2s 0.2s linear'
                : 'opacity 0s 0s linear',
            }}
          >
            <SearchResults query={deferredQuery} />
          </div>
        </Suspense>
      </label>
    </>
  );
};

const SearchResults: FC<{ query: string }> = ({ query }) => {
  if (query === '') {
    return null;
  }

  const albums = use(fetchData(`/search?q=${query}`));

  console.log({ albums });

  if (albums.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    );
  }

  console.log({ albums });

  return (
    <ul>
      {albums.map(a => (
        <li key={a.id}>
          {a.title} ({a.year})
        </li>
      ))}
    </ul>
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
