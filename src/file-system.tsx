import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type Tree = {
  [key: number]: {
    id: number;
    name: string;
    childIds: number[];
  };
  [key: string]: any;
};

const initialState: Tree = {
  0: {
    id: 0,
    name: '(root)',
    childIds: [1],
  },
  1: {
    id: 1,
    name: 'main',
    childIds: [],
  },
  length: 1,
};

type FileSystemContextDefaultValue = {
  tree: Tree;
  parentId: number;
  childIds: number[];
  handleDelete: (parentId: number, childId: number) => void;
  handleAdd: (childId: number, name: string) => void;
  handleEdit: (childId: number, name: string) => void;
};

const FileSystemContext = createContext<FileSystemContextDefaultValue>({
  tree: {},
  parentId: 0,
  childIds: [],
  handleDelete: () => {},
  handleAdd: () => {},
  handleEdit: () => {},
});

const useFileSystemContext = () => useContext(FileSystemContext);

export const FileSystemProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tree, setTree] = useState(initialState);
  const parentId = 0;
  const root = tree[parentId];
  const childIds = root.childIds;

  const handleDelete = (parentId: number, childId: number) => {
    const parent = tree[parentId];

    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter(id => id !== childId),
    };

    function deleteChildren(id: number) {
      const child = tree[id];
      child.childIds.forEach(deleteChildren);
      delete child[id];
    }
    deleteChildren(childId);

    setTree({ ...tree, [parentId]: nextParent });
  };

  const handleEdit = (childId: number, name: string) => {
    const child = tree[childId];

    const nextChild = {
      ...child,
      name,
    };

    setTree({
      ...tree,
      [childId]: nextChild,
    });
  };

  const handleAdd = (childId: number, name: string) => {
    const child = tree[childId];

    const nextChild = {
      ...child,
      childIds: [tree.length + 1, ...child.childIds],
    };

    setTree({
      ...tree,
      [tree.length + 1]: {
        id: tree.length + 1,
        name,
        childIds: [],
      },
      length: tree.length + 1,
      [childId]: nextChild,
    });
  };

  const value = { tree, parentId, childIds, handleAdd, handleDelete, handleEdit };

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
};

const FileSystem: FC = () => {
  const { tree, parentId, childIds, handleAdd } = useFileSystemContext();
  console.log({ tree });

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isAdding]);


  let content: React.ReactNode;

  const handleAddSave = () => {
    setName('');

    if (name.length === 0) return;
    handleAdd(parentId, name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  if (isAdding) {
    content = (
      <form
        onSubmit={() => {
          setIsAdding(false);
          handleAddSave();
        }}
      >
        <span>Adding new item</span>
        <li style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            style={{ alignSelf: 'center' }}
            ref={inputRef}
            value={name}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              setIsAdding(false);
              handleAddSave();
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setName('');
            }}
          >
            Cancel
          </button>
        </li>
      </form>
    );
  } else if (!isAdding) {
    content = (
      <>
        <button
          style={{ marginBottom: '1rem' }}
          onClick={() => setIsAdding(true)}
        >
          Add item
        </button>
      </>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <ul
        style={{
          listStyle: 'none',
          maxWidth: '500px',
        }}
      >
        {content}
        {childIds.map(id => (
          <FileTree
            key={id}
            id={id}
            parentId={parentId}
          />
        ))}
      </ul>
    </div>
  );
};

type FileTreeProps = {
  id: number;
  parentId: number;
};

const FileTree: FC<FileTreeProps> = ({
  id,
  parentId,
}) => {
  const { tree, handleAdd, handleDelete, handleEdit } = useFileSystemContext();

  const child = tree[id];
  const childIds = child.childIds;
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  let content: React.ReactNode;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing, isAdding]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEditSave = () => {
    setName('');

    if (name.length === 0) return;
    handleEdit(id, name);
  };

  const handleAddSave = () => {
    setName('');

    if (name.length === 0) return;
    handleAdd(id, name);
  };

  if (isEditing) {
    content = (
      <form
        style={{ display: 'flex', gap: '0.5rem' }}
        onSubmit={() => {
          setIsEditing(false);
          handleEditSave();
        }}
      >
        <input
          style={{ alignSelf: 'center' }}
          ref={inputRef}
          value={name}
          onChange={handleChange}
        />
        <button
          onClick={() => {
            setIsEditing(false);
            handleEditSave();
          }}
        >
          Save
        </button>

        <button
          onClick={() => {
            setIsEditing(false);
            setName('');
          }}
        >
          Cancel
        </button>
      </form>
    );
  } else if (isAdding) {
    content = (
      <form
        onSubmit={() => {
          setIsAdding(false);
          handleAddSave();
        }}
      >
        {child.name}
        <ul>
          <li style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              style={{ alignSelf: 'center' }}
              ref={inputRef}
              value={name}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                setIsAdding(false);
                handleAddSave();
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setName('');
              }}
            >
              Cancel
            </button>
          </li>
        </ul>
      </form>
    );
  } else {
    content = (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            alignSelf: 'stretch',
          }}
          onClick={() => {
            setIsEditing(true);
            setName(child.name);
          }}
          onKeyUp={e => {
            if (e.code === 'Enter') {
              setIsEditing(true);
              setName(child.name);
            }
          }}
          tabIndex={id}
        >
          {child.name}
        </span>
        <button tabIndex={id} onClick={() => setIsAdding(true)}>
          Add
        </button>
        <button tabIndex={id} onClick={() => handleDelete(parentId, id)}>
          Delete
        </button>
      </div>
    );
  }

  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {content}

      <ul style={{ listStyle: 'none' }}>
        {childIds.map(childId => (
          <FileTree
            key={childId}
            id={childId}
            parentId={id}
          />
        ))}
      </ul>
    </li>
  );
};

export default FileSystem;
