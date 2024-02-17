import { useTransition } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

export default function AddCommentContainer() {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong!</p>}>
      <AddCommentButton />
    </ErrorBoundary>
  );
}

function addComment(comment: null | any) {
  if(comment == null) {
    throw new Error('Example Error: An error thrown to trigger error boundary!');
  }
}

function AddCommentButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button disabled={pending} onClick={() => {
      startTransition(() => {
        addComment(null);
      });
    }}>
      Add comment
    </button>
  );
}
