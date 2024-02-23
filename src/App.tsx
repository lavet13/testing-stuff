import { useCallback, useEffect, useRef, useState } from 'react';

import ModalDialog from './modal-dialog';
import DataFetcher from './data-fetcher';
import ClassComponent from './class-component';
import FunctionalComponent from './functional-component';
import { FilterableProductTable } from './products';
import { Todo, TodoList } from './todos';
import Accordion from './accordion';
import { Chat } from './chat-room';
import List, { Item } from './list-not-need-an-effect';
import Counter from './counter';
import RequestTracker from './request-tracker';
import useOnlineStatus from './use-online-status-hook';
import TabContainer from './tabs';
import TodosApp from './todos-app';
import { useMouseCoords } from './use-mouse-coords-hook';
import Form from './form';
import FormPerson from './form-person';
import TaskApp from './todos-use-state';
import InitializerTodoList from './initializer-todos';
import Poem from './poem';
import { Contacts } from './contacts';
import { ContextHeading } from './context-heading';
import ImageGallery from './image-gallery';
import { SuspenseRouter } from './suspense-router';
import AddCommentContainer from './error-boundary-transition';
import { Artist } from './suspense-albums';
import { SearchBox } from './suspense-search-query';
import { DeferredTodos } from './deferred-todos';
import MovingDot from './moving-dot';
import FeedbackForm from './hotel-feedback';
import Menu from './travel-snack';
import TravelPlan from './travel-plan';
import Packing from './packing-list';
import MailClient from './letters';
import LettersMultiSelection from './letters-multiselection';
import PreservingCounter from './preserving-resetting-state-counter';
import FileSystem from './file-system';

// const data = [
//   { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
//   { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
//   { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
//   { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
//   { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
//   { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
// ];

// let didInit = false;

// Check if we're running in the browser.
if (typeof window === 'undefined') {
  // ✅ Only runs once per app load
}

function App() {
  // const isOnline = useOnlineStatus();
  // const [openTodos, setOpenTodos] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const [person, setPerson] = useState('Alice');
  // const [filter, setFilter] = useState('');
  // const [todos, setTodos] = useState<Todo[]>([
  //   { id: 1, name: 'homework' },
  //   { id: 2, name: 'watching dogshit TV' },
  //   { id: 3, name: 'cooking' },
  // ]);
  // const [items, setItems] = useState<Item[]>([
  //   { id: 'item1', name: 'item 1' },
  //   { id: 'item2', name: 'item 2' },
  //   { id: 'item3', name: 'item 3' },
  // ]);
  // const idRef = useRef(4);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  //
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setFilter(e.target.value);
  //
  // const handleAddTodo = useCallback(() => {
  //   setTodos(todos => [
  //     ...todos,
  //     { id: ++idRef.current, name: inputRef.current!.value },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   if(!didInit) {
  //     didInit = true;
  //
  //   }
  // }, []);


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto',
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
      {/* <FunctionalComponent originalList={["Ivan", "Pavel", "Sasha", "Lena"]} /> */}
      {/* <Accordion /> */}

      {/* <label>Filter: </label> */}
      {/* <input value={filter} onChange={handleChange} /> */}
      {/**/}
      {/* <TodoList */}
      {/*   todos={todos} */}
      {/*   filter={filter} */}
      {/*   handleAddTodo={handleAddTodo} */}
      {/*   ref={inputRef} */}
      {/* /> */}
      {/* <DeferredTodos /> */}
      {/* <FeedbackForm /> */}
      {/* <MovingDot /> */}

      {/* <FilterableProductTable products={data} /> */}

      {/* <Chat /> */}
      {/**/}
      {/* <List items={items} setItems={setItems} /> */}
      {/**/}
      {/* <Counter /> */}
      {/**/}
      {/* <RequestTracker /> */}
      {/**/}
      {/**/}
      {/* <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1> */}
      {/**/}
      {/* <button onClick={() => setOpenTodos(open => !open)}> */}
      {/*   {openTodos ? 'Close' : 'Open'} */}
      {/* </button> */}
      {/**/}
      {/* {openTodos && <TodosApp />} */}
      {/* <Form /> */}
      {/* <FormPerson /> */}

      {/* <PreservingCounter /> */}
      {/* <LettersMultiSelection /> */}
      {/* <MailClient /> */}
      {/* <Packing /> */}
      {/* <TravelPlan /> */}
      {/* <Menu /> */}
      {/* <TabContainer /> */}
      {/* <TaskApp /> */}
      {/* <InitializerTodoList /> */}
      {/* <Poem /> */}
      {/* <Artist /> */}
      {/* <SuspenseRouter /> */}
      {/* <SearchBox /> */}
      {/* <Contacts /> */}
      {/* <ContextHeading /> */}
      {/* <ImageGallery /> */}
      <FileSystem />
    </div>
  );
}

export default App;
