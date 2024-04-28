import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function GrupoPartidas() {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Grupo Partidas</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio Unitario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { codigo: "001", nombre: "Partida 1", precioUnitario: 100 },
            { codigo: "002", nombre: "Partida 2", precioUnitario: 200 },
            { codigo: "003", nombre: "Partida 3", precioUnitario: 300 },
          ].map((partida) => (
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
    </>
  );
}
