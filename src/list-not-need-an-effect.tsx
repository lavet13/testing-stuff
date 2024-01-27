import React, { FC, useEffect, useState } from 'react';

type Item = {
  id: string;
  name: string;
};

type ListProps = {
  items: Item[];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
};

const List: FC<ListProps> = ({ items, setItems }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleChecking = (e: React.MouseEvent<HTMLButtonElement>) => {
    setItems([...items].reverse());
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  // useEffect(() => {
  //   setSelection(null);
  // }, []);

  // Better: Adjust the state while rendering
  // const [prevItems, setPrevItems] = useState(items);
  // if (items !== prevItems) {
  //   setPrevItems(items);
  //   setSelection(null);
  // }

  const selection = items.find(item => item.id === selectedId) ?? null;
  console.log({ selection });

  return (
    <>
      <select onChange={handleChange}>
        {items.map(item => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={handleChecking}>Reverse the List</button>
    </>
  );
};

export default List;
