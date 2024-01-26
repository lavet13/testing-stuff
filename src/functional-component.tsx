import React, { FC, useMemo, useState } from "react";

const originalList = ["Ivan", "Pavel", "Sasha", "Lena"];

const FunctionalComponent: FC = () => {
  const [filter, setFilter] = useState("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const fItems = useMemo(() => {
    console.log("memo");

    const res = originalList.filter((item) =>
      item.toLowerCase().trim().includes(filter.toLowerCase().trim()),
    );

    return res;
  }, [filter]);

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
