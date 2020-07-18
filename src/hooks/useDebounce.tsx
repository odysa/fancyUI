/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-16 10:39:53 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-18 20:31:43
 */
import { useEffect, useState } from "react";

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
