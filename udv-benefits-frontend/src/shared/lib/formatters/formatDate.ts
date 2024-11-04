export const formatDate = (date: string) => {
  const [day, month, year] = date.split(".");

  return `${year}-${month}-${day}`;
};

export const formatDateToDot = (date: string) => {
  const [day, month, year] = date.split("-");

  return `${year}.${month}.${day}`;
};
