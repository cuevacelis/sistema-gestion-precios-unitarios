"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
export default function NuevoProyectoPage() {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    codigo: "ABC123", // Valor predeterminado para el ejemplo
    nombre: "",
    ubicacion: "",
    cliente: "",
    jornal: 0,
  });

  // Datos ficticios para la tabla de Grupo de Partidas
  const partidas = [
    { codigo: "001", nombre: "partida1", precioUnitario: 100 },
    { codigo: "002", nombre: "partida2", precioUnitario: 200 },
    { codigo: "003", nombre: "partida3", precioUnitario: 300 },
  ];

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-6">Nuevo Proyecto</h1>
      <form className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label>Código</label>
          <div className="flex items-center">
            <Input type="text" name="codigo" value={formData.codigo} readOnly />
            <Button onClick={() => console.log("Guardar")}>Guardar</Button>
          </div>
        </div>
        <div>
          <label>Nombre</label>
          <Input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ubicación</label>
          <select
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          >
            {/* Opciones de ubicación */}
          </select>
        </div>
        <div>
          <label>Cliente</label>
          <select
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
          >
            {/* Opciones de cliente */}
          </select>
        </div>
        <div>
          <label>Jornal</label>
          <Input
            type="number"
            name="jornal"
            value={formData.jornal}
            onChange={handleChange}
          />
        </div>
      </form>

      <h2 className="text-lg font-semibold mb-4">Grupo Partidas</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeader>Código</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Precio Unitario</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partidas.map((partida) => (
            <TableRow key={partida.codigo}>
              <TableCell>{partida.codigo}</TableCell>
              <TableCell>{partida.nombre}</TableCell>
              <TableCell>{partida.precioUnitario}</TableCell>
              <TableCell>
                <Button>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6">
        <label>Presupuesto</label>
        <Input type="text" readOnly value="Calcular desde partidas..." />
      </div>
    </div>
  );
}
