import React, { useEffect, useRef, useState } from 'react';

type Todo = {
  id: number;
  text: string;
};

const createInitialTodos = () => {
  const initialTodos: Todo[] = [];

  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: `Item ${i + 1}`,
    });
  }

  return initialTodos;
};

const InitializerTodoList = () => {
  const [todos, setTodos] = useState(createInitialTodos());
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(todos);

  return (
    <>
      <input ref={inputRef} value={text} onChange={e => setText(e.target.value)} />
      <button
        onClick={() => {
          setText('');
          setTodos([{ id: todos.length, text }, ...todos]);
          inputRef.current!.focus();
        }}
      >
        Add
      </button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};

export default InitializerTodoList;
