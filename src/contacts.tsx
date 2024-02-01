import React, { type FC } from 'react';

import { useImmerReducer } from 'use-immer';

type Contact = {
  id: number;
  name: string;
  email: string;
};

const contacts: Contact[] = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
];

enum CONTACTS_ACTION_TYPES {
  SET_SELECT_ID = 'SET_SELECT_ID',
  SET_MESSAGE = 'SET_MESSAGE',
}

const CONTACTS_INITIAL_STATE: {
  messages: {
    [key: string]: string;
  };
  selectedId: number;
} = {
  messages: {
    0: '',
    1: '',
    2: '',
  },
  selectedId: 0,
};

type ContactsInitialState = typeof CONTACTS_INITIAL_STATE;

function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

type ContactsAction = {
  type: CONTACTS_ACTION_TYPES;
  payload: any;
};

function contactsReducer(draft: ContactsInitialState, action: ContactsAction) {
  const { type, payload } = action;

  switch (type) {
    case CONTACTS_ACTION_TYPES.SET_SELECT_ID:
      draft.selectedId = payload;
      break;

    case CONTACTS_ACTION_TYPES.SET_MESSAGE:
      const contactId = draft.selectedId;
      const message = payload;

      draft.messages[contactId] = message;
      break;

    default:
      throw Error(`Unhandled type of ${type} in contactsReducer`);
  }
}

export const Contacts: FC = () => {
  const [state, dispatch] = useImmerReducer(
    contactsReducer,
    CONTACTS_INITIAL_STATE,
  );

  const message = state.messages[state.selectedId];
  const selectedId = state.selectedId;
  const contact = contacts.find(c => c.id === state.selectedId) as Contact;

  return (
    <div>
      <ContactList
        selectedId={selectedId}
        contacts={contacts}
        dispatch={dispatch}
      />
      <Chat dispatch={dispatch} message={message} contact={contact} />
    </div>
  );
};

type ContactListProps = {
  contacts: Contact[];
  selectedId: number;
  dispatch: React.Dispatch<ContactsAction>;
};

const ContactList: FC<ContactListProps> = ({
  contacts,
  selectedId,
  dispatch,
}) => {
  const handleSelect = (contactId: number) => () =>
    dispatch(createAction(CONTACTS_ACTION_TYPES.SET_SELECT_ID, contactId));

  return (
    <section>
      <ul>
        {contacts.map(contact => (
          <button key={contact.id} onClick={handleSelect(contact.id)}>
            {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
          </button>
        ))}
      </ul>
    </section>
  );
};

type ChatProps = {
  message: string;
  contact: Contact;
  dispatch: React.Dispatch<ContactsAction>;
};

const Chat: FC<ChatProps> = ({ message, contact, dispatch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(createAction(CONTACTS_ACTION_TYPES.SET_MESSAGE, e.target.value));
  };

  const handleSend = () => {
    if (message.length !== 0) {
      alert('Sended!');
      dispatch(createAction(CONTACTS_ACTION_TYPES.SET_MESSAGE, ''));
    }
  };

  return (
    <section>
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleSend}>Send to {contact.email}</button>
    </section>
  );
};
