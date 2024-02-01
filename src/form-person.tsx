import { useState } from 'react';

const FormPerson = () => {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nestedFields = Object.keys(person.artwork);

    if (nestedFields.includes(name)) {
      setPerson(p => ({
        ...p,
        artwork: {
          ...p.artwork,
          [name]: value,
        },
      }));
    } else {
      setPerson(p => ({ ...p, [name]: value }));
    }
  };

  return (
    <>
      <label>
        Name:
        <input name='name' value={person.name} onChange={handleChange} />
      </label>
      <label>
        Title:
        <input
          name='title'
          value={person.artwork.title}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          name='city'
          value={person.artwork.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Image:
        <input
          name='image'
          value={person.artwork.image}
          onChange={handleChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  );
};

export default FormPerson;
