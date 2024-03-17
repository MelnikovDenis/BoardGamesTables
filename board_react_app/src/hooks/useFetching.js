import { useState } from "react";

const useFetching = (callback) => {
  const [error, setError] = useState(null);

  const fetching = async (...args) => {
      try {
        await callback(...args);
      } catch (e) {
        setError(e);
      } 
    };

    return [fetching, error];
};

export default useFetching;