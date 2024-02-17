import React, { FC, useState } from 'react';

type Status = 'typing' | 'sending' | 'sent';

const FeedbackForm: FC = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<Status>('typing');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if(isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button disabled={isSending} type="submit">Send</button>
      {isSending && <p>Sending . . .</p>}
    </form>
  );
};

// Pretend to send a message
function sendMessage(text: string) {
  return new Promise(res => {
    setTimeout(res, 2000);
  });
}

export default FeedbackForm;
