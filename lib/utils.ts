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

export const combineFormDatas = (
  formData1: FormData,
  formData2: FormData
): FormData => {
  const combinedFormData = new FormData();

  for (const [key, value] of formData1.entries()) {
    combinedFormData.append(key, value);
  }

  for (const [key, value] of formData2.entries()) {
    combinedFormData.append(key, value);
  }

  return combinedFormData;
};

export function obtenerSiglas(nombreCompleto: string): string {
  const palabras = nombreCompleto
    .split(" ")
    .filter((palabra) => palabra.length > 0);

  let iniciales: string[] = [];

  if (palabras.length === 1) {
    iniciales = [
      palabras[0][0].toUpperCase(),
      palabras[0][1] ? palabras[0][1].toUpperCase() : "",
    ];
  } else {
    iniciales = palabras.slice(0, 2).map((palabra) => palabra[0].toUpperCase());
  }

  return iniciales.join("");
}

export function convertirRutaAItems(
  ruta: string
): { href: string; label: string }[] {
  const segmentos = ruta.split("/").filter((segmento) => segmento.length > 0);
  const items: { href: string; label: string }[] = [];

  let rutaAcumulada = "";

  for (const segmento of segmentos) {
    rutaAcumulada += `/${segmento}`;
    items.push({
      href: rutaAcumulada,
      label: segmento.charAt(0).toUpperCase() + segmento.slice(1),
    });
  }

  return items;
}

export function divideArrayToBreadcrumbItems<T>(
  arr: T[],
  maxItemsView: number
): T[][] {
  if (maxItemsView <= 0) {
    return [[], arr, []];
  }
  const difference = arr.length - maxItemsView;
  const positionStartMiddleGroup = 1;
  const positionStartLastGroup =
    difference > 0 ? difference + positionStartMiddleGroup : 1;

  const firstGroup = arr.slice(0, 1);
  const middleGroup = arr.slice(
    positionStartMiddleGroup,
    positionStartLastGroup
  );
  const lastGroup = arr.slice(positionStartLastGroup, arr.length);
  return [firstGroup, middleGroup, lastGroup];
}
