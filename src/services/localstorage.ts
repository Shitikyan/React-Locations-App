export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export const setItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
