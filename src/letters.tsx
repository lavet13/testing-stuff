import { FC, useState } from 'react';

type Letter = {
  id: number;
  subject: string;
  isStarred: boolean;
};

const initialLetters: Letter[] = [
  {
    id: 0,
    subject: 'Ready for adventure?',
    isStarred: true,
  },
  {
    id: 1,
    subject: 'Time to check in!',
    isStarred: false,
  },
  {
    id: 2,
    subject: 'Festival Begins in Just SEVEN Days!',
    isStarred: false,
  },
];

const MailClient: FC = () => {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId] = useState(initialLetters[0].id);

  function handleHover(letter: Letter) {
    setHighlightedId(letter.id);
  }

  function handleStar(starred: Letter) {
    setLetters(
      letters.map(letter => {
        if (letter.id === starred.id) {
          return { ...letter, isStarred: !letter.isStarred };
        } else {
          return letter;
        }
      }),
    );
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={letter.id === highlightedId}
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
};

type LetterProps = {
  letter: Letter;
  isHighlighted: boolean;
  onHover: (letter: Letter) => void;
  onToggleStar: (letter: Letter) => void;
};

const Letter: FC<LetterProps> = ({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) => {
  return (
    <li
      style={{ background: isHighlighted ? '#646cff' : 'none' }}
      onFocus={() => onHover(letter)}
      onPointerMove={() => onHover(letter)}
    >
      <button
        onClick={() => {
          onToggleStar(letter);
        }}
      >
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>

      {letter.subject}
    </li>
  );
};

export default MailClient;
