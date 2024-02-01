import { useState } from 'react';

export const useReducer = (
  reducer: (state: any, action: any) => void,
  initialState: any,
) => {
  const [state, setState] = useState(initialState);

  function dispatch(action: any) {
    setState(s => reducer(s, action));
  }

  return [state, dispatch];
};
