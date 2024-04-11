import { useState } from 'react';

const initialImages = [
  {
    place: 'Penang, Malaysia',
    src: 'https://i.imgur.com/FJeJR8M.jpg',
  },
  {
    place: 'Lisbon, Portugal',
    src: 'https://i.imgur.com/dB2LRbj.jpg',
  },
  {
    place: 'Bilbao, Spain',
    src: 'https://i.imgur.com/z08o2TS.jpg',
  },
  {
    place: 'Valparaíso, Chile',
    src: 'https://i.imgur.com/Y3utgTi.jpg',
  },
  {
    place: 'Schwyz, Switzerland',
    src: 'https://i.imgur.com/JBbMpWY.jpg',
  },
  {
    place: 'Prague, Czechia',
    src: 'https://i.imgur.com/QwUKKmF.jpg',
  },
  {
    place: 'Ljubljana, Slovenia',
    src: 'https://i.imgur.com/3aIiwfm.jpg',
  },
];

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const hasNext = index < initialImages.length - 1;

  const handleClick = () => {
    if(hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const image = initialImages[index];

  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {initialImages.length}
      </h3>
      <img key={image.src} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
};

export default Gallery;
