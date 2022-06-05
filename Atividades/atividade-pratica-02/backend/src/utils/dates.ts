export function dateFormatVerifier(date: string): boolean {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!dateRegex.test(date)) return false;

  try {
    new Date(date);
  } catch {
    return false;
  }
  return true;
}

export function dateVerifier(deadline: string): boolean {
  const today = new Date();
  const [day, month, year] = deadline.split('/').map((value) => +value);
  const deadlineDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  return deadlineDate.getTime() >= today.getTime();
}

export function compareTwoDates(date1: string, date2: Date): boolean {
  const [day1, month1, year1] = date1.split('/').map((value) => +value);

  const date1Date = new Date(year1, month1 - 1, day1, 0, 0, 0, 0);

  return date1Date.getTime() > date2.getTime();
}

export function toDate(date: string): Date {
  const [day, month, year] = date.split('/').map((value) => +value);

  const convertedToDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  return convertedToDate;
}
