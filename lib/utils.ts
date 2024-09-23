import clsx, { ClassValue } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";
import { IBrowserInfo } from "./types";

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

export function obtenerHoraRelativa(
  fechaUTC: Date,
  timeZone: string = DateTime.local().zoneName
): string {
  const ahora = DateTime.now().setZone(timeZone);
  const fechaObjetivo = DateTime.fromJSDate(fechaUTC, { zone: "utc" }).setZone(
    timeZone
  );

  // Calcular la diferencia en minutos, luego derivar horas y días
  const diferenciaEnMinutos = Math.floor(
    ahora.diff(fechaObjetivo, "minutes").minutes
  );
  const diferenciaEnHoras = Math.floor(diferenciaEnMinutos / 60);
  const diferenciaEnDias = Math.floor(diferenciaEnHoras / 24);

  if (diferenciaEnDias >= 7) {
    const semanas = Math.floor(diferenciaEnDias / 7);
    return `hace ${semanas} semana${semanas > 1 ? "s" : ""}`;
  } else if (diferenciaEnDias >= 1) {
    return `hace ${diferenciaEnDias} día${diferenciaEnDias > 1 ? "s" : ""}`;
  } else if (diferenciaEnHoras >= 1) {
    return `hace ${diferenciaEnHoras} hora${diferenciaEnHoras > 1 ? "s" : ""}`;
  } else {
    return `hace ${diferenciaEnMinutos} minuto${diferenciaEnMinutos > 1 ? "s" : ""}`;
  }
}

export function formatDateTimeForFilename(
  dateTime?: DateTime,
  timeZone: string = DateTime.local().zoneName
): string {
  const utcDate = dateTime ? dateTime : DateTime.utc();

  const zonedDate = utcDate.setZone(timeZone);
  return zonedDate.toFormat("yyyyMMddHHmmss");
}

export function getBrowserInfo(): IBrowserInfo {
  const userAgent: string = navigator.userAgent;
  let browserName: string;
  let fullVersion: string = "Unknown Version";
  let majorVersion: number = 0;
  let os: string = "Unknown OS";

  // Detectar el sistema operativo
  if (navigator.appVersion.indexOf("Win") !== -1) os = "Windows";
  if (navigator.appVersion.indexOf("Mac") !== -1) os = "MacOS";
  if (navigator.appVersion.indexOf("X11") !== -1) os = "UNIX";
  if (navigator.appVersion.indexOf("Linux") !== -1) os = "Linux";

  // Detectar el nombre y la versión del navegador
  if (/OPR|Opera/.test(userAgent)) {
    browserName = "Opera";
    fullVersion = userAgent.split("OPR/")[1] || userAgent.split("Opera/")[1];
  } else if (/Edg/.test(userAgent)) {
    browserName = "Microsoft Edge";
    fullVersion = userAgent.split("Edg/")[1];
  } else if (/Chrome/.test(userAgent)) {
    browserName = "Google Chrome";
    fullVersion = userAgent.split("Chrome/")[1];
  } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    browserName = "Safari";
    fullVersion = userAgent.split("Version/")[1];
  } else if (/Firefox/.test(userAgent)) {
    browserName = "Mozilla Firefox";
    fullVersion = userAgent.split("Firefox/")[1];
  } else if (
    userAgent.indexOf("MSIE") !== -1 ||
    !!(document as any).documentMode
  ) {
    // IF IE > 10
    browserName = "Internet Explorer";
    fullVersion = userAgent.split("MSIE ")[1] || userAgent.split("rv:")[1];
  } else {
    browserName = "Unknown Browser";
  }

  // Obtener la versión principal
  if (fullVersion) {
    majorVersion = parseInt(fullVersion.split(".")[0], 10);
  }

  return {
    browserName: browserName,
    fullVersion: fullVersion,
    majorVersion: majorVersion,
    userAgent: userAgent,
    os: os,
  };
}
