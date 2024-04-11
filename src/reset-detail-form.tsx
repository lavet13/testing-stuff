import React, { FC, useState } from 'react';

type Contact = {
  id: number;
  name: string;
  email: string;
};

const initialContacts: Contact[] = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
];

const ResetDetailForm = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedId, setSelectedId] = useState(initialContacts[0].id);

  const selectedContact = contacts.find(c => c.id === selectedId)!;

  const handleSave = (updatedData: Contact) => {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });

    setContacts(nextContacts);
  };

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedContact.id}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  );
};

type ContactListProps = {
  contacts: Contact[];
  selectedId: number;
  onSelect: (selectedId: number) => void;
};

const ContactList: FC<ContactListProps> = ({
  contacts,
  selectedId,
  onSelect,
}) => {
  return (
    <section>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact.id);
              }}
            >
              {contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

type EditContactProps = {
  initialData: Contact;
  onSave: (updatedContact: Contact) => void;
};

const EditContact: FC<EditContactProps> = ({
  initialData: { id, ...initialData },
  onSave,
}) => {
  const [{ name, email }, setFormValues] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues(fv => ({ ...fv, [name]: value }));
  };

  return (
    <section>
      <label>
        Name:{' '}
        <input type='text' name='name' value={name} onChange={handleChange} />
      </label>
      <label>
        Email:{' '}
        <input
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />
      </label>
      <button
        onClick={() => {
          const updatedData = {
            id,
            name,
            email,
          };
          onSave(updatedData);
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          setFormValues(initialData);
        }}
      >
        Reset
      </button>
    </section>
  );
};

export default ResetDetailForm;
