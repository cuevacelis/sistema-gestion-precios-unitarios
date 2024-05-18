import { z } from "zod";

export const credentialsSchema = z.object({
  user: z.string(),
  password: z.string().min(1),
});

export const creatPresupuestoSchema = z.object({
  name: z.string().min(1, "El campo 'Nombre' es requerido"),
  nameUser: z.string().min(1, "El campo 'Nombre de usuario' es requerido"),
  departamento: z.string().min(1, "El campo 'Departamento' es requerido"),
  provincia: z.string().min(1, "El campo 'Provincia' es requerido"),
  distrito: z.string().min(1, "El campo 'Distrito' es requerido"),
  client: z.string().min(1, "El campo 'Cliente' es requerido"),
  jornal: z.string().min(1, "El campo 'Jornal' es requerido"),
});

export const editPresupuestoSchema = z.object({
  name: z.string().min(1, "El campo 'Nombre' es requerido"),
  nameUser: z.string().min(1, "El campo 'Nombre de usuario' es requerido"),
  departamento: z.string().min(1, "El campo 'Departamento' es requerido"),
  provincia: z.string().min(1, "El campo 'Provincia' es requerido"),
  distrito: z.string().min(1, "El campo 'Distrito' es requerido"),
  client: z.string().min(1, "El campo 'Cliente' es requerido"),
  jornal: z.string().min(1, "El campo 'Jornal' es requerido"),
});

export const deletePresupuestoSchema = z.object({
  id: z.number().min(1, "El campo 'Pre_Id' es requerido"),
});
