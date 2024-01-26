import React, { useEffect, type FC, useState } from "react";
import { fetch } from "./utils/fetch";

type DataFetcherProps = {
  person: string;
};

const DataFetcher: FC<DataFetcherProps> = ({ person }) => {
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    console.log("effect");

    let ignore = false;

    (async () => {
      const result = await fetch(person);

      if (!ignore) {
        setBio(result);
      }
    })();

    return () => {
      console.log("cleanup function");
      ignore = true;
    };
  }, [person]);

  return (
    <p>
      <i>{bio ?? "Loading..."}</i>
    </p>
  );
};

export default DataFetcher;
