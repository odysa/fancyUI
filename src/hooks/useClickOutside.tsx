/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-16 10:39:49 
 * @Last Modified by:   Chengxu Bian 
 * @Last Modified time: 2020-07-16 10:39:49 
 */
import { RefObject,useEffect} from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //if dropdown not exist or click it, do nothing
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
