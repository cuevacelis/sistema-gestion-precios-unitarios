import * as XLSX from "xlsx";

interface DynamicObject {
  [key: string]: string | number;
}

const exportToExcel = (
  data: DynamicObject[],
  nameFile: string,
  nameSheet: string = "Sheet1"
) => {
  const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, nameSheet);

  XLSX.writeFile(wb, `${nameFile}.xlsx`);
};

export default exportToExcel;
