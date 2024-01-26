import { useCallback, useRef, useState } from 'react';

import ModalDialog from './modal-dialog';
import DataFetcher from './data-fetcher';
// import ClassComponent from './class-component';
// import FunctionalComponent from './functional-component';
// import { FilterableProductTable } from './products';
import { Todo, TodoList } from './todos';
// import Accordion from './accordion';
import { Chat } from './chat-room';

// const data = [
//   { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
//   { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
//   { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
//   { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
//   { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
//   { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
// ];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [person, setPerson] = useState('Alice');
  const [filter, setFilter] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, name: 'homework' },
    { id: 2, name: 'watching dogshit TV' },
    { id: 3, name: 'cooking' },
  ]);
  const idRef = useRef(4);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const handleAddTodo = useCallback(() => {
    setTodos(todos => [
      ...todos,
      { id: ++idRef.current, name: inputRef.current!.value },
    ]);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* <select */}
      {/*   value={person} */}
      {/*   onChange={(e: React.ChangeEvent<HTMLSelectElement>) => */}
      {/*     setPerson(e.target.value) */}
      {/*   } */}
      {/* > */}
      {/*   <option value='Alice'>Alice</option> */}
      {/*   <option value='Bob'>Bob</option> */}
      {/*   <option value='Taylor'>Taylor</option> */}
      {/* </select> */}
      {/**/}
      {/* <DataFetcher person={person} /> */}
      {/**/}
      {/* <button onClick={() => setIsOpen(isOpen => !isOpen)}> */}
      {/*   {isOpen ? 'Close' : 'Open'} */}
      {/* </button> */}
      {/**/}
      {/* <ModalDialog isOpen={isOpen}> */}
      {/*   <p style={{ textAlign: 'center' }}>Hello there!</p> */}
      {/*   <button onClick={() => setIsOpen(show => !show)}>Close it!</button> */}
      {/* </ModalDialog> */}

      {/* <ClassComponent /> */}
      {/* <FunctionalComponent /> */}
      {/* <Accordion /> */}

      <label>Filter: </label>
      <input value={filter} onChange={handleChange} />

      <TodoList
        todos={todos}
        filter={filter}
        handleAddTodo={handleAddTodo}
        ref={inputRef}
      />

      {/* <FilterableProductTable products={data} /> */}

      <Chat />
    </div>
  );
}

export default App;
