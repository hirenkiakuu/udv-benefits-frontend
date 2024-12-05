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

export const formatToHours = (isoString: string) => {
  const date = new Date(isoString);
  const timeString = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};

export const formatYears = (years: number) => {
  if (years === 1) return `${years} год`;
  if (years >= 2 && years <= 4) return `${years} года`;
  return `${years} лет`;
};

export const formatYearsAndMonths = (years: number, months: number) => {
  const yearString = formatYears(years);

  let monthString;
  if (months === 1) {
    monthString = `${months} месяц`;
  } else if (months >= 2 && months <= 4) {
    monthString = `${months} месяца`;
  } else {
    monthString = `${months} месяцев`;
  }

  return `${yearString} ${monthString}`;
};

export const formatPeriod = (period: string) => {
  if (period === "one_month") return "1 месяц";
  else if (period === "three_months") return "3 месяца";
  else return "1 год";
};
