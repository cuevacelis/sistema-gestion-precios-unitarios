"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useAsyncList } from "@react-stately/data";
import Cookies from "js-cookie";
import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { PlusIcon } from "./PlusIcon";
import { SearchIcon } from "./SearchIcon";
import { DeleteIcon } from "./_iconsAction/DeleteIcon";
import { EditIcon } from "./_iconsAction/EditIcon";
import { EyeIcon } from "./_iconsAction/EyeIcon";
import { capitalize } from "./utils";

interface ITableData {
  elementosPorPagina: number;
  errorMessage: any;
  isSuccessful: boolean;
  paginaActual: number;
  totalDeElementos: number;
  totalDePagina: number;
  data: [
    {
      pre_Codigo: string;
      usu_NomApellidos: string;
      pre_Nombre: string;
      cli_NomApeRazSocial: string;
      ubi_Departamento: string;
      ubi_Provincia: string;
      ubi_Distrito: string;
      pre_Jornal: string;
      pre_FecHorRegistro: string;
    }
  ];
}

const COLUMNS_TABLE = [
  {
    key: "pre_Codigo",
    label: "Codigo",
    allowsSorting: true,
  },
  {
    key: "infoUser",
    label: "Información",
    allowsSorting: true,
  },
  {
    key: "usu_NomApellidos",
    label: "Nombre y Apellidos",
    allowsSorting: true,
  },
  {
    key: "pre_Nombre",
    label: "Nombre",
  },
  {
    key: "cli_NomApeRazSocial",
    label: "RazonSocial",
  },
  {
    key: "location",
    label: "Ubicación",
  },
  {
    key: "ubi_Departamento",
    label: "Departamento",
  },
  {
    key: "ubi_Provincia",
    label: "Provincia",
  },
  {
    key: "ubi_Distrito",
    label: "Distrito",
  },
  {
    key: "pre_Jornal",
    label: "Jornal",
  },
  {
    key: "pre_FecHorRegistro",
    label: "Fecha y hora registro",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

const INITIAL_VISIBLE_COLUMNS = [
  "pre_Codigo",
  "infoUser",
  "location",
  "pre_Jornal",
  "pre_FecHorRegistro",
  "actions",
];

export default function Page() {
  // const [rowsPerPage, setRowsPerPage] = useState<number>(3);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentPageRef = useRef<number>(1);
  const currentRowsPerPageRef = useRef<number>(3);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [totalOfItems, setTotalOfItems] = useState<number>(0);
  console.log(selectedRows);
  // console.log(currentTotalPages);

  let tableData = useAsyncList<ITableData["data"][0]>({
    async load({ signal }) {
      let res = await fetch(
        `http://serfercer-001-site1.gtempurl.com/api/v1/Presupuesto/Obten_Paginado/${currentRowsPerPageRef.current}/${currentPageRef.current}/%20`,
        {
          signal,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "GET",
        }
      );
      let json: ITableData = await res.json();
      setCurrentTotalPages(json.totalDePagina);
      setTotalOfItems(json.totalDeElementos);
      return { items: json.data };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as "pre_Codigo"];
          let second = b[sortDescriptor.column as "pre_Codigo"];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const renderCell = useCallback(
    (item: ITableData["data"][0], columnKey: any) => {
      const cellValue = item[columnKey as "pre_Codigo"];

      switch (columnKey) {
        case "infoUser":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: "https://i.pravatar.cc/150",
              }}
              description={item.usu_NomApellidos}
              name={item.pre_Nombre}
            >
              {item.usu_NomApellidos}
            </User>
          );
        case "location":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.ubi_Departamento}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {item.ubi_Provincia}-{item.ubi_Distrito}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Editar">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const handleChangePage = (newPage: number) => {
    currentPageRef.current = newPage;
    setSelectedRows(new Set([]));
    tableData.reload();
  };

  const handleChangeRowsPerPage = (event: any) => {
    currentRowsPerPageRef.current = event.target.value;
    currentPageRef.current = 1;
    setSelectedRows(new Set([]));
    tableData.reload();
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return COLUMNS_TABLE;

    return COLUMNS_TABLE.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            // value={filterValue}
            // onClear={() => onClear()}
            // onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Tabla de columnas"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {COLUMNS_TABLE.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onClick={onOpen} color="primary" endContent={<PlusIcon />}>
              Agregar
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalOfItems} datos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={handleChangeRowsPerPage}
              defaultValue={currentRowsPerPageRef.current}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [visibleColumns, totalOfItems]);

  const bottomContent = useMemo(() => {
    if (tableData.isLoading) {
      return null;
    } else {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
            {selectedRows === "all"
              ? "Todos las filas seleccionadas"
              : `${selectedRows.size} de ${tableData.items.length} seleccionado`}
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={currentPageRef.current}
            total={currentTotalPages}
            onChange={handleChangePage}
          />
        </div>
      );
    }
  }, [selectedRows, currentPageRef, currentTotalPages, tableData.isLoading]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Tabla de presupuestos"
        selectionBehavior="toggle"
        selectionMode="multiple"
        selectedKeys={selectedRows}
        onSelectionChange={setSelectedRows}
        disabledKeys={[]}
        // onRowAction={(key) => alert(`Opening item "${key}"`)}
        sortDescriptor={tableData.sortDescriptor}
        onSortChange={tableData.sort}
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[482px]",
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.allowsSorting}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={tableData.items}
          isLoading={tableData.isLoading}
          // loadingContent={<Spinner color="warning" />}
          emptyContent={
            tableData.isLoading ? "Cargando..." : "No hay datos para mostrar."
          }
        >
          {(item) => (
            <TableRow key={item.pre_Codigo}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        backdrop="opaque"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal: Agregar
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full flex-wrap gap-4">
                  <Input
                    type="text"
                    label="Nombre y Apellidos"
                    placeholder=""
                  />
                  <Input type="text" label="Nombre" placeholder="Avon" />
                  <Input
                    type="text"
                    label="Razón social"
                    placeholder="PRODUCTOS AVON S A"
                  />
                  <Input
                    type="text"
                    label="Departamento"
                    placeholder="La Libertad"
                  />
                  <Input type="text" label="Provincia" placeholder="TRUJILLO" />
                  <Input type="text" label="Distrito" placeholder="TRUJILLO" />
                  <Input type="number" label="Jornal" placeholder="6" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
