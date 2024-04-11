import { FC, useState } from 'react';

const Reverse = () => {
  const [reverse, setReverse] = useState(false);

  let checkbox = (
    <label>
      <input
        type='checkbox'
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );

  if(reverse) {
    return (
      <>
        <Field key={'last'} label="Last name" />
        <Field key={'first'} label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key={'first'} label='First name' />
        <Field key={'last'} label='Last name' />
        {checkbox}
      </>
    );
  }
};

type FieldProps = {
  label: string;
};

const Field: FC<FieldProps> = ({ label }) => {
  const [text, setText] = useState('');

  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}

export default Reverse;
