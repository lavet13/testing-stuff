import { FC, useMemo, useState } from "react";

type FunctionalComponentProps = {
  originalList: string[];
};

const FunctionalComponent: FC<FunctionalComponentProps> = ({ originalList }) => {
  const [filter, setFilter] = useState("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const fItems = useMemo(() => originalList.filter(item => {
    const itemToFilter = item.toLowerCase().trim();
    const searchValue = filter.toLowerCase().trim();

    return itemToFilter.includes(searchValue);
  }), [filter, originalList]);

  return (
    <>
      <input type="search" onChange={handleFilter} />
      {fItems.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );
};

export default FunctionalComponent;
