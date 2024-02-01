import React, {
  FC,
  ReactNode,
  useReducer,
  useRef,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react';
import { useImmer, useImmerReducer } from 'use-immer';
import { produce } from 'immer';

type TodosContextDefaultValue = {
  todos: Todo[];
  handleChangeTodo: (todoToUpdate: Todo) => void;
  handleDeleteTodo: (todoIdToDelete: number) => void;
  handleDeleteTodos: () => void;
  handleAddTodo: (title: string) => void;
  handleMarkTodo: () => void;
};

const TodosContext = createContext<TodosContextDefaultValue>({
  todos: [],
  handleChangeTodo: () => {},
  handleDeleteTodo: () => {},
  handleDeleteTodos: () => {},
  handleAddTodo: () => {},
  handleMarkTodo: () => {},
});

const useTodosContext = () => useContext(TodosContext);

const TodosProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ todos }, dispatch] = useImmerReducer(
    todosReducer,
    TODOS_INITIAL_STATE,
  );

  const handleChangeTodo = (todoToUpdate: Todo) => {
    dispatch(
      createAction(
        TODOS_ACTION_TYPES.SET_TODO_ITEMS,
        updateTodoItem(todos, todoToUpdate),
      ),
    );
  };

  const handleDeleteTodo = (todoIdToDelete: number) => {
    dispatch(
      createAction(
        TODOS_ACTION_TYPES.SET_TODO_ITEMS,
        deleteTodoItem(todos, todoIdToDelete),
      ),
    );
  };

  const handleDeleteTodos = () => {
    dispatch(
      createAction(TODOS_ACTION_TYPES.SET_TODO_ITEMS, clearTodoItems(todos)),
    );
  };

  const handleAddTodo = (title: string) => {
    dispatch(
      createAction(
        TODOS_ACTION_TYPES.SET_TODO_ITEMS,
        addTodoItem(todos, title),
      ),
    );
  };

  const handleMarkTodo = () => {
    dispatch(
      createAction(TODOS_ACTION_TYPES.SET_TODO_ITEMS, markTodoItem(todos)),
    );
  };

  const value = {
    todos,
    handleChangeTodo,
    handleDeleteTodo,
    handleDeleteTodos,
    handleAddTodo,
    handleMarkTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

type Todo = {
  id: number;
  title: string;
  done: boolean;
  mark: boolean;
};

let nextId = 3;
const data: Todo[] = [
  { id: 0, title: 'First task', done: true, mark: false },
  { id: 1, title: 'Second task', done: false, mark: false },
  { id: 2, title: 'Third task', done: false, mark: false },
];

function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

enum TODOS_ACTION_TYPES {
  SET_TODO_ITEMS = 'SET_TODO_ITEMS',
}

type TodosAction = {
  type: TODOS_ACTION_TYPES;
  payload: Todo[];
};

const TODOS_INITIAL_STATE = {
  todos: data,
};

type TodoInitialState = typeof TODOS_INITIAL_STATE;

const todosReducer = (draft: TodoInitialState, action: TodosAction) => {
  const { type, payload } = action;

  switch (type) {
    case TODOS_ACTION_TYPES.SET_TODO_ITEMS:
      draft.todos = payload;
      break;
    // return { ...state, todos: payload };

    default:
      throw Error(`Unhandled type of ${type} in cartReducer`);
  }
};

const addTodoItem = (todos: Todo[], title: string): Todo[] =>
  produce(todos, draft => {
    draft.push({ id: nextId++, title, done: false, mark: false });
  });

// [
//   ...todos,
//   { id: nextId++, title, done: false },
// ]

const deleteTodoItem = (todos: Todo[], todoId: number): Todo[] =>
  produce(todos, draft => {
    const index = draft.findIndex(todo => todo.id === todoId);

    if (index !== -1) draft.splice(index, 1);
  });

// todos.filter(todo => todo.id !== todoId);

const clearTodoItems = (todos: Todo[]): Todo[] =>
  produce(todos, draft => {
    return draft.filter(todo => !todo.done);
  });

// todos.filter(todo => !todo.done);

const updateTodoItem = (todos: Todo[], todoToUpdate: Todo): Todo[] =>
  produce(todos, draft => {
    const index = draft.findIndex(todo => todo.id === todoToUpdate.id);

    console.log({ todoToUpdate });

    if (index !== -1) draft[index] = todoToUpdate;
  });

// todos.map(t => {
//     if (t.id === todoToUpdate.id) {
//     return todoToUpdate;
//     } else {
//     return t;
//     }
//     });

const markTodoItem = (todos: Todo[]) =>
  produce(todos, draft => {
    draft.forEach(todo => {
      if (todo.done) {
        todo.mark = !todo.mark;
        todo.done = false;
      }
    });
  });

// todos.map(t => t.done ? {...t, mark: !t.mark} : t);

const TaskApp: FC = () => {
  return (
    <TodosProvider>
      <TaskList />
      <AddTodo />
    </TodosProvider>
  );
};

export default TaskApp;

const AddTodo: FC = () => {
  const {
    handleAddTodo: onAddTodo,
    handleDeleteTodos,
    handleMarkTodo,
  } = useTodosContext();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (title.length === 0) {
      setMessage('Не заполнено название!');
      return;
    }
    setTitle('');
    setMessage('');
    onAddTodo(title);
  };

  // I need to know which todos are checked to delete

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <input name='title' value={title} onChange={handleChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
      {message.length !== 0 && <p>{message}</p>}
      <button title='Pick todos to delete!' onClick={handleDeleteTodos}>
        Delete Todos
      </button>
      <button title='Mark todos to complete!' onClick={handleMarkTodo}>
        Mark todos
      </button>
    </div>
  );
};

const TaskList: FC = () => {
  const { todos } = useTodosContext();

  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.5rem',
        maxWidth: '500px',
        width: '100%',
      }}
    >
      {todos.map(todo => (
        <Task key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const Task: FC<{ todo: Todo }> = ({ todo }) => {
  const { handleChangeTodo, handleDeleteTodo } = useTodosContext();
  const [isEditing, setIsEditing] = useState(false);
  // this `done` was causing the problem with changing the state only after
  // clicking the checkbox twice, so the old version of `done` not the one
  // I was getting from event handler, oops =)

  const [{ title, done }, setFormValues] = useState({
    title: todo.title,
    done: todo.done,
  });

  const [prevTodo, setPrevTodo] = useState(todo);

  if (prevTodo !== todo) {
    console.log('help?');
    setPrevTodo(todo);
    setFormValues(todo);
  }

  let content: ReactNode;

  const handleSave = () => {
    handleChangeTodo({ ...todo, title });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;

    const isCheckbox = type === 'checkbox';

    setFormValues(fv => ({ ...fv, [name]: isCheckbox ? checked : value }));
  };

  if (isEditing) {
    content = (
      <>
        <input
          name='title'
          value={title}
          onChange={handleChange}
          style={{ textAlign: 'center' }}
        />
        <button
          onClick={() => {
            setIsEditing(false);
            handleSave();
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    content = (
      <>
        <span style={{ justifySelf: 'center' }}>
          {todo.mark ? <s>{todo.title}</s> : todo.title}
        </span>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  const handleDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    handleChange(e);
    handleChangeTodo({ ...todo, done: checked });
  };

  return (
    <label
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto',
        columnGap: '1rem',
        alignItems: 'center',
      }}
    >
      <input
        type='checkbox'
        name='done'
        checked={done}
        onChange={handleDone}
        style={{ width: '20px', height: '20px' }}
      />
      {content}
      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    </label>
  );
};
