import { useSyncExternalStore } from 'react';

let coords = { x: 0, y: 0 };

function subscribe(callback: () => void) {
  const moveHandler = (e: PointerEvent) => {
    coords = { ...coords, x: e.clientX, y: e.clientY };

    callback();
  };

  window.addEventListener('pointermove', moveHandler);

  return () => {
    window.removeEventListener('pointermove', moveHandler);
  };
}

function getSnapshot() {
  return coords;
}

export const useMouseCoords = () => {
  const coords = useSyncExternalStore(subscribe, getSnapshot);

  return coords;
};
