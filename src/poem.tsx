import React, { FC, Fragment, ReactNode } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.',
  ],
};

// const Poem: FC = () => {
//   return (
//     <article>
//       {poem.lines.map((line, index, arr) => (
//         <Fragment key={index}>
//           {index !== 0 && <hr />}
//           <p>{line}</p>
//         </Fragment>
//       ))}
//     </article>
//   );
// };

const Poem = () => {
  let output: ReactNode[] = [];

  // Fill the output array
  output.forEach((line, i) => {
    output.push(<hr key={`${i}-separator`}/>);

    output.push(<p key={`${i}-text`}>{line}</p>);
  });

  output.shift(); // removes the first <hr />

  return (
    <article>
      {output}
    </article>
  );
};

export default Poem;
