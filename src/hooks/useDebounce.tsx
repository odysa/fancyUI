import React, { useEffect, useState } from "react";

function useDebounce(value: string, delay: number = 300) {
  const [debounceVal, setdebounceVal] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setdebounceVal(value);
    }, delay);
    // if timeout doesn't be called
    //return function to remove effect
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
}

export default useDebounce;
