import React, { useMemo, useState } from 'react';

export type Todo = {
  id: number;
  name: string;
};

type TodoListProps = {
  filter: string;
  todos: Todo[];
  handleAddTodo: () => void;
};

const getFilteredTodos = (todos: Todo[], filter: string) => {
  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  const startTime = performance.now();
  while (performance.now() - startTime < 200) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return todos.filter(({ name }) =>
    name.toLowerCase().trim().includes(filter.toLowerCase().trim()),
  );
};

export const TodoList = React.forwardRef<HTMLInputElement, TodoListProps>(
  ({ filter, todos, handleAddTodo }, ref) => {
    const [test, setText] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      setText(e.target.value);
    };

    console.log({ test });

    console.time('filter array');
    const filteredTodos = useMemo(
      () => getFilteredTodos(todos, filter),
      [filter, todos],
    );
    console.timeEnd('filter array');

    return (
      <>
        {filteredTodos.map(({ id, name }) => (
          <p key={id}>{name}</p>
        ))}
        <label>Is not Slow:</label>
        <input value={test} onChange={handleChange} />

        <label>AddTodo:</label>
        <input ref={ref} />

        <button onClick={handleAddTodo}>Add Todo</button>
      </>
    );
  },
);
