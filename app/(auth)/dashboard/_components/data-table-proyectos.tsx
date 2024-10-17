"use client";

import { ISpPresupuestoObtenPaginado } from "@/lib/types/types";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";

interface IProps {
  dataProyectos: ISpPresupuestoObtenPaginado[];
}

export default function TableComponent({ dataProyectos }: IProps) {
  return (
    <ul>
      {dataProyectos[0].result.data.map((project) => (
        <li key={project.pre_id} className="mb-2 p-2 bg-secondary rounded-md">
          <div className="font-semibold">{project.pre_nombre}</div>
          <div className="text-sm text-muted-foreground">
            {formatDateToDateTimeWith12HourFormat(project.pre_fechorregistro)}
          </div>
        </li>
      ))}
    </ul>
  );
}
