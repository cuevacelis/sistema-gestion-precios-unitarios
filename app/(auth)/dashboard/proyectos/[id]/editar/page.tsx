"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

// Supongamos que obtienes los detalles del proyecto a editar de algún servicio o contexto
export function fetchProjectDetails(projectId: any) {
  // Esta función debería devolver los detalles de un proyecto dado su ID
  // Aquí se retorna un ejemplo estático
  return {
    codigo: "PRJ001",
    nombre: "Proyecto Alfa",
    ubicacion: "1",
    cliente: "1",
    jornal: 150.0,
  };
}

export default function EditProjectPage({ params }: any) {
  const projectId = params.id; // ID del proyecto obtenido de los parámetros de la URL o props
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    ubicacion: "",
    cliente: "",
    jornal: 0,
  });

  // Cargar los datos del proyecto cuando el componente se monta
  useEffect(() => {
    const projectDetails = fetchProjectDetails(projectId);
    setFormData(projectDetails);
  }, [projectId]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar la actualización del proyecto
  const handleUpdate = () => {
    console.log("Actualizar proyecto", formData);
    // Aquí iría la lógica para enviar los datos actualizados al servidor
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-6">Editar Proyecto</h1>
      <form className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label>Código</label>
          <Input type="text" name="codigo" value={formData.codigo} readOnly />
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
        <div className="col-span-2">
          <Button onClick={handleUpdate}>Editar</Button>
        </div>
      </form>
    </div>
  );
}
