import React from 'react';

type Task = {
  id?: number;
  text?: string;
  done?: boolean;
  task?: {
    id: number;
    text: string;
  },
  type?: 'added' | 'changed' | 'deleted';
};

function tasksReducer(state: Task[], action: Task): Task[] {
  switch (action.type) {
    case 'added': {
      return [...state, { id: action.id, text: action.text, done: false }];
    }
    case 'changed': {
      return state.map(task => {
        if (task.id === action.task!.id) {
          return {...action.task!, done: action.done};
        } else {
          return task!;
        }
      });
    }
    case 'deleted': {
      return state.filter(task => {
        return task.id !== action.id;
      });
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

let initialState: Task[] = [];
let actions: Task[] = [
  { type: 'added', id: 1, text: 'Visit Kafka Museum' },
  { type: 'added', id: 2, text: 'Watch a puppet show' },
  { type: 'deleted', id: 1 },
  { type: 'added', id: 3, text: 'Lennon Wall pic' },
  { type: 'added', id: 4, text: 'Lennon Wall pic' },
  { type: 'deleted', id: 2 },
  { type: 'changed', task: { id: 3, text: 'DEBIL' } },
];

let finalState = actions.reduce(tasksReducer, initialState);
console.log({ finalState });

const LidlUseReducer = () => {
};

export default LidlUseReducer;
