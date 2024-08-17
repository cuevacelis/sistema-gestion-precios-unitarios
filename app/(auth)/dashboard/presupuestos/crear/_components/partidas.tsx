// TableManager.tsx
"use client"; // TableManager.tsx
import React, { useState } from "react";

type TableRow = {
  id: number;
  content: string;
  children?: TableRow[];
  isExpanded?: boolean;
};

const TableManager: React.FC = () => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [newRowContent, setNewRowContent] = useState<string>("");

  const addRow = (parentId?: number) => {
    const newRow: TableRow = {
      id: Date.now(),
      content: newRowContent,
    };
    if (parentId) {
      const addRowToChildren = (rows: TableRow[]): TableRow[] =>
        rows.map((row) =>
          row.id === parentId
            ? {
                ...row,
                children: [...(row.children || []), newRow],
                isExpanded: true,
              }
            : { ...row, children: addRowToChildren(row.children || []) }
        );
      setRows(addRowToChildren(rows));
    } else {
      setRows([...rows, newRow]);
    }
    setNewRowContent("");
  };

  const deleteRow = (id: number, rows: TableRow[]): TableRow[] =>
    rows.reduce((acc: TableRow[], row) => {
      if (row.id === id) return acc;
      const updatedRow = {
        ...row,
        children: deleteRow(id, row.children || []),
      };
      return [...acc, updatedRow];
    }, []);

  const handleDeleteRow = (id: number) => {
    setRows(deleteRow(id, rows));
  };

  const toggleExpand = (id: number) => {
    const toggleExpandRecursively = (rows: TableRow[]): TableRow[] =>
      rows.map((row) =>
        row.id === id
          ? { ...row, isExpanded: !row.isExpanded }
          : { ...row, children: toggleExpandRecursively(row.children || []) }
      );
    setRows(toggleExpandRecursively(rows));
  };

  const renderRows = (rows: TableRow[], level = 0) =>
    rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr className={`bg-${level === 0 ? "white" : "gray-200"}`}>
          <td className={`border p-2 pl-${level * 4 + 4}`}>
            {row.children && row.children.length > 0 && (
              <button onClick={() => toggleExpand(row.id)} className="mr-2">
                {row.isExpanded ? "-" : "+"}
              </button>
            )}
            {row.content}
          </td>
          <td className="border p-2">
            <button
              onClick={() => handleDeleteRow(row.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Eliminar
            </button>
            <button
              onClick={() => addRow(row.id)}
              className="bg-green-500 text-white p-1 rounded ml-2"
            >
              Agregar Hija
            </button>
          </td>
        </tr>
        {row.isExpanded && row.children && renderRows(row.children, level + 1)}
      </React.Fragment>
    ));

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          value={newRowContent}
          onChange={(e) => setNewRowContent(e.target.value)}
          className="border p-2 mr-2 flex-grow"
        />
        <button
          onClick={() => addRow()}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Agregar Padre
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Contenido</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>{renderRows(rows)}</tbody>
      </table>
    </div>
  );
};

export default TableManager;
