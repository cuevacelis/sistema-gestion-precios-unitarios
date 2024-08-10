import { formatDateTimeForFilename } from "@/lib/utils";
import { utils, writeFile } from "xlsx-js-style";

interface DynamicObject {
  [key: string]: string | number;
}

const exportToExcelWithColor = (
  data: DynamicObject[],
  nameFile: string,
  nameSheet: string = "Sheet1"
) => {
  const ws = utils.json_to_sheet(data);

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, nameSheet);

  // Estilizando la primera fila
  if (ws["!ref"]) {
    const range = utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = utils.encode_cell({ c: C, r: 0 });
      if (ws[cell_address]) {
        ws[cell_address].s = {
          fill: {
            fgColor: { rgb: "ADADAD" },
          },
          font: {
            color: { rgb: "FFFFFF" },
            bold: true,
          },
        };
      }
    }
  } else {
    console.error("No se pudo obtener el rango de la hoja.");
  }

  writeFile(wb, `${nameFile}_${formatDateTimeForFilename()}.xlsx`);
};

export default exportToExcelWithColor;
