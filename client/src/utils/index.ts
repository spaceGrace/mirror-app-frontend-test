import { differenceInDays, format } from "date-fns";
import { IPost } from "../types";

export const paginateArr = (
  array: IPost[],
  currentPage: number,
  pageSize: number
) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
};

export const masonryArr = (arr: IPost[], columns: number, rows: number) => {
  const x = [];
  const xarr = [...arr];
  for (let index = 0; index < columns; index++) {
    x.push(xarr.splice(0, rows));
  }
  return x;
};

const daySuffix = (days: number): string => {
  if (days === 1) {
    return "день";
  }
  if (days >= 2 && days <= 4) {
    return "дня";
  }
  return "дней";
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const daysDiff = differenceInDays(now, date);

  if (daysDiff < 7) {
    if (daysDiff === 0) {
      return "сегодня";
    }
    return `${daysDiff} ${daySuffix(daysDiff)} назад`;
  }

  return format(date, "dd/MM/yyyy");
};
