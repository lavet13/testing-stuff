import { useEffect, useState, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
  };
}

// const useOnlineStatus = () => {
//   const [isOnline, setIsOnline] = useState(true);
//   useEffect(() => {
//     const updateState = () => {
//       setIsOnline(navigator.onLine);
//     };
//
//     window.addEventListener('online', updateState);
//     window.addEventListener('offline', updateState);
//
//     return () => {
//       window.removeEventListener('online', updateState);
//       window.removeEventListener('offline', updateState);
//     };
//   }, []);
//
//   return isOnline;
// };

const useOnlineStatus = () => {
  return useSyncExternalStore(
    subscribe, // react won't  resubscribe for as long as you pass
    // the same function

    () => navigator.onLine, //how to get value on the client
    () => true, // how to get the value on the server
  );
};

export default useOnlineStatus;
