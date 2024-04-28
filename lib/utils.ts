import clsx, { ClassValue } from "clsx";
import { IResult } from "mssql";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function simulateLongWait(timeInMillis: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Tiempo de espera completado");
    }, timeInMillis);
  });
}

export function convertDecimalToNumber(data: any[], objectToConvert: string) {
  return data.forEach((item: any) => {
    if ((item[objectToConvert] as any).toStringTag === "[object Decimal]") {
      const decimal = item.Pre_Jornal as any;
      item.Pre_Jornal =
        parseFloat(decimal.d.join("")) *
        (decimal.s < 0 ? -1 : 1) *
        Math.pow(10, decimal.e);
    }
  });
}

export function returnEssencialDataQuery<T>(resultQuery: IResult<T>) {
  return {
    data: resultQuery.recordset.map((row: any) => {
      const { columns, ...rest } = row;
      return rest;
    }),
    moreInfo: resultQuery.output,
  };
}
