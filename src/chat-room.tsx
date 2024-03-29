import React, { useState, type FC, useCallback, useEffect } from 'react';
import { createConnection } from './connection';

type ChatRoomProps = {
  roomId: string;
};

const useChatRoom = ({ serverUrl, roomId }) => {
  useEffect(() => {
    function createOptions() {
      return { serverUrl, roomId };
    }

    const connection = createConnection(createOptions());
    connection.connect();

    return () => connection.disconnect();
  }, [roomId, serverUrl]);
};

export const ChatRoom: FC<ChatRoomProps> = ({ roomId }) => {
  const [serverUrl, setServerUrl] = useState('http://localhost:4000/');

  // const createOptions = useCallback(() => {
  //   return { serverUrl: serverUrl, roomId: roomId };
  // }, [serverUrl, roomId]);

  useChatRoom({ serverUrl, roomId });

  return (
    <>
      <label>
        Server URL:{' '}
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
};

export const Chat = () => {
  const [roomId, setRoomId] = useState('general');

  const [show, setShow] = useState(false);

  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
};
