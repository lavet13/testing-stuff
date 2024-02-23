import { FC, useState } from 'react';

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
    childIds: [2, 3],
  },
  2: {
    id: 2,
    name: 'John',
    childIds: [],
  },
  3: {
    id: 3,
    name: 'Doe',
    childIds: [],
  },
  length: 3,
};

const FileSystem: FC = () => {
  const [tree, setTree] = useState(initialState);
  const parentId = 0;
  const root = tree[parentId];
  const childIds = root.childIds;
  console.log({ tree });

  const handleEdit = () => {};

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

  return (
    <ul style={{ width: '100%' }}>
      {childIds.map(id => (
        <FileTree
          key={id}
          id={id}
          parentId={parentId}
          tree={tree}
          onAdd={handleAdd}
        />
      ))}
    </ul>
  );
};

type FileTreeProps = {
  id: number;
  parentId: number;
  tree: Tree;
  onAdd: (childId: number, name: string) => void;
};

const FileTree: FC<FileTreeProps> = ({ id, parentId, tree, onAdd }) => {
  const child = tree[id];
  const childIds = child.childIds;
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  let content: React.ReactNode;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    if (name.length === 0) return;
    onAdd(id, name);
    setName('');
  };

  if (isEditing) {
  } else if (isAdding) {
    content = (
      <ul>
        <li>
          <input value={name} onChange={handleChange} />
          <button
            onClick={() => {
              setIsAdding(false);
              handleSave();
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
            }}
          >
            Cancel
          </button>
        </li>
      </ul>
    );
  } else {
    content = (
      <>
        <button onClick={() => setIsAdding(true)}>Add</button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  return (
    <li>
      {child.name}
      {content}

      <ul>
        {childIds.map(childId => (
          <FileTree
            key={childId}
            id={childId}
            parentId={id}
            tree={tree}
            onAdd={onAdd}
          />
        ))}
      </ul>
    </li>
  );
};

export default FileSystem;
