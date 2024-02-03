import { FC, PropsWithChildren, createContext, useContext } from 'react';

type SectionProps = {
  level: number;
};

const LevelContext = createContext<SectionProps>({ level: 0 });

const useLevelContext = () => useContext(LevelContext);

// const useLevelContext = () => {
//   const context = useContext(LevelContext)
//
//   if(!context) {
//     throw Error('out of context LevelContext!');
//   }
//
//   return context;
// };

const Section: FC<
  PropsWithChildren<Partial<SectionProps> & { isFancy?: boolean }>
> = ({ isFancy, children }) => {
  const value = useLevelContext();

  return (
    <section {...(isFancy ? { style: { border: '2px dashed red', padding: '0.2rem 1rem', } } : {})}>
      <LevelContext.Provider value={{ level: value.level + 1 }}>
        {children}
      </LevelContext.Provider>
    </section>
  );
};

const Heading: FC<PropsWithChildren> = ({ children }) => {
  const { level } = useLevelContext();

  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level ' + level);
  }
};

type PostProps = {
  title: string;
  body: string;
};

const Post: FC<PostProps> = ({ title, body }) => {
  return (
    <Section isFancy={true}>
      <Heading>{title}</Heading>
      <p>
        <i>{body}</i>
      </p>
    </Section>
  );
};

export const ContextHeading: FC = () => {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Post title='Flavors of Lisbon' body='...those pastéis de nata!' />
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Section>
              <Heading>Sub-sub-sub-heading</Heading>
              <Heading>Sub-sub-sub-heading</Heading>
              <Heading>Sub-sub-sub-heading</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );
};
