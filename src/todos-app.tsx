import { useSyncExternalStore } from 'react';

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners: (() => void)[] = [];

const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: `Todo #${nextId}` }];
    emitChanges();
  },
  subscribe(listener: () => void) {
    console.log({ listener });
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

const emitChanges = () => {
  console.log({ listeners });
  for (const listener of listeners) {
    listener();
  }
};

const TodosApp = () => {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
  );

  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};

export default TodosApp;
