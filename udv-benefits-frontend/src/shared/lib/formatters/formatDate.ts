export const formatDate = (date: string) => {
  const [day, month, year] = date.split(".");

  return `${year}-${month}-${day}`;
};

export const formatDateToDot = (date: string) => {
  const [day, month, year] = date.split("-");

  return `${year}.${month}.${day}`;
};

export const formatToLocalDate = (ISODateString: string): string => {
  const ISODate = new Date(ISODateString);

  const day = String(ISODate.getUTCDate()).padStart(2, "0");
  const month = String(ISODate.getUTCMonth() + 1).padStart(2, "0");
  const year = ISODate.getUTCFullYear();

  return `${day}.${month}.${year}`;
};
