import { FC, memo, useDeferredValue, useState } from 'react';

type Todo = {
  id: string;
  name: string;
};

const getFilteredTodos = (todos: Todo[], filter: string) => {
  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return todos.filter(({ name }) =>
    name.toLowerCase().trim().includes(filter.toLowerCase().trim()),
  );
};

const originalList: Todo[] = [
  { id: 'asdf', name: 'Ivan' },
  { id: 'something', name: 'Pavel' },
];

export const DeferredTodos = () => {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <Todos filter={deferredFilter} />
    </>
  );
};

const Todos: FC<{ filter: string }> = memo(({ filter }) => {
  const fTodos = getFilteredTodos(originalList, filter);

  return (
    <ul>
      {fTodos.map(t => (
        <li key={t.id}>{t.name}</li>
      ))}
    </ul>
  );
});
