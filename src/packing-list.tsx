import React, { FC, useState } from 'react';

type Item = {
  id: number;
  title: string;
  packed: boolean;
};

let nextId = 3;
const initialItems: Item[] = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

const Packing: FC = () => {
  const [items, setItems] = useState(initialItems);
  const total = items.length;
  const packed = items.reduce((acc, cur) => {
    if(cur.packed) return acc + 1;

    return acc;
  }, 0);

  function handleAddItem(title: string) {
    setItems([...items, { id: nextId++, title, packed: false }]);
  }

  function handleChangeItem(nextItem: Item) {
    setItems(
      items.map(item => {
        if (item.id === nextItem.id) {
          return nextItem;
        } else {
          return item;
        }
      }),
    );
  }

  function handleDelete(itemId: number) {
    setItems(items.filter(item => item.id !== itemId));
  }

  return (
    <>
      <AddItem onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDelete} onChangeItem={handleChangeItem} />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
};

type AddItemProps = {
  onAddItem: (title: string) => void;
};

const AddItem: FC<AddItemProps> = ({ onAddItem }) => {
  const [title, setTitle] = useState('');
  return (
    <>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button
        onClick={() => {
          setTitle('');
          onAddItem(title);
        }}
      >
        Add
      </button>
    </>
  );
};

type PackingListProps = {
  items: Item[];
  onChangeItem: (nextItem: Item) => void;
  onDeleteItem: (itemId: number) => void;
};

const PackingList: FC<PackingListProps> = ({
  items,
  onChangeItem,
  onDeleteItem,
}) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={e => {
                onChangeItem({ ...item, packed: e.target.checked });
              }}
            />
            {' '}
            {item.title}
          </label>
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Packing;
