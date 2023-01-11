export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item;
};

export const setItem = (key: string, data: any) => {
  const dataSet = typeof data === 'string' ? data : JSON.stringify(data);
  localStorage.setItem(key, dataSet);
};
