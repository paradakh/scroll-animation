export const debounce = (fn: (...args: any[]) => any, timeout: number) => {
  let id: any = -1;
  return (...args: any[]) => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
      id = -1;
    }, timeout);
  };
};
