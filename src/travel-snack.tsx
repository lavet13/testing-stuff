import React, { useState } from 'react';

type Item = {
  id: number;
  title: string;
};

const initialItems: Item[] = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

const Menu = () => {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(i => i.id === selectedId);

  const handleItemChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(items.map(i => {
      if(i.id === id) {
        return {
          ...i,
          title: e.target.value,
        };
      } else {
        return i;
      }
    }));
  };

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            <input value={i.title} onChange={e => {
              handleItemChange(i.id, e);
            }} />
            {' '}
            <button onClick={() => {
              setSelectedId(i.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem!.title}</p>
    </>
  );
};

export default Menu;
