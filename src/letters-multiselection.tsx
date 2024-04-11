import { FC } from 'react';
import { useImmer } from 'use-immer';

type Letter = {
  id: number;
  subject: string;
  isStarred: boolean;
};

const letters: Letter[] = [
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

type LetterProps = {
  letter: Letter;
  onToggle: (id: number) => void;
  isSelected: boolean;
};

const Letter: FC<LetterProps> = ({ letter, onToggle, isSelected }) => {
  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  );
};

const LettersMultiSelection = () => {
  const [selectedIds, setSelectedIds] = useImmer(new Set<number>());

  const selectedCount = selectedIds.size;

  const handleToggle = (toggledId: number) => {
    // updateSelectedIds(draft => {
    //   if(draft.includes(toggledId)) {
    //     draft.splice(draft.findIndex(id => id === toggledId), 1);
    //   } else {
    //     draft.push(toggledId);
    //   }
    // });
    // setSelectedIds(ids => {
    //   if(ids.includes(toggledId)) {
    //     return ids.filter(id => id !== toggledId);
    //   } else {
    //     return [...ids, toggledId];
    //   }
    // });
    //
    // if(selectedIds.includes(toggledId)) {
    //   setSelectedIds(selectedIds.filter(id => id !== toggledId));
    // } else {
    //   setSelectedIds([...selectedIds, toggledId]);
    // }
    const nextIds = new Set(selectedIds);
    if(nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  };

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={selectedIds.has(letter.id)}
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
};

export default LettersMultiSelection;
