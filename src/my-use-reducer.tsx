import { useState } from 'react';

export const useReducer = (reducer: (state: any, action: any) => any, initialState: any) => {
  const [state, setState] = useState(initialState);

  function dispatch(action: any) {
    setState((s: any) => reducer(s, action));
  }

  return [state, dispatch];
};
