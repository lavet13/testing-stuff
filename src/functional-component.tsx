import { FC, useDeferredValue, useMemo, useState } from 'react';

type FunctionalComponentProps = {
  originalList: string[];
};

const FunctionalComponent: FC<FunctionalComponentProps> = ({
  originalList,
}) => {
  const [filter, setFilter] = useState('');

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const fItems = useMemo(
    () =>
      originalList.filter(item => {
        const itemToFilter = item.toLowerCase().trim();
        const searchValue = filter.toLowerCase().trim();

        return itemToFilter.includes(searchValue);
      }),
    [filter, originalList],
  );

  const deferredFItems = useDeferredValue(fItems);

  const isStale = fItems !== deferredFItems;

  console.log({ isStale });

  return (
    <>
      <input type='search' onChange={handleFilter} />
      <div
        style={{
          opacity: isStale ? 0.5 : 1,
          transition: isStale
            ? 'opacity 0.2s 0.2s linear'
            : 'opacity 0s 0s linear',
        }}
      >
        {fItems.map(item => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </>
  );
};

export default FunctionalComponent;
