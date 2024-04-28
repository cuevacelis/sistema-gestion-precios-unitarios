"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function NuevoProyectoPage() {
  const [formData, _] = useState({
    codigo: "ABC123",
    nombre: "",
    ubicacion: "",
    cliente: "",
    jornal: 0,
  });

  return (
    <form className="grid grid-cols-1 mt-4 gap-y-6 gap-x-6">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm w-20 truncate">Código</label>
          <Badge variant="outline">{formData.codigo}</Badge>
        </div>
        <Button type="submit" className="btn btn-primary">
          Guardar
        </Button>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Nombre</label>
        <Input type="text" name="nombre" value={formData.nombre} />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Ubicación</label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Cliente</label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <label className="text-sm w-20 truncate">Jornal</label>
        <Input type="number" name="jornal" value={formData.jornal} />
      </div>
    </form>
  );
}
