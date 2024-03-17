import { useState } from "react";

const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetching = async (...args) => {
      try {
        setIsLoading(true);
        await callback(...args);
      } catch (e) {
        setError(e);
      }
      finally {
        setIsLoading(false);
      }
    };

    return [fetching, error, isLoading];
};

export default useFetching;