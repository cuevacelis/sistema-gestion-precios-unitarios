import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    }),
});

export const creatPresupuestoSchema = z.object({
  namePresupuesto: z
    .string()
    .min(1, "El campo 'Nombre de presupuesto' es requerido"),
  nameUser: z.string().min(1, "El campo 'Nombre de usuario' es requerido"),
  pais: z.number().min(1, "El campo 'Pais' es requerido"),
  departamento: z.number().min(1, "El campo 'Departamento' es requerido"),
  provincia: z.number().min(1, "El campo 'Provincia' es requerido"),
  distrito: z.number().min(1, "El campo 'Distrito' es requerido"),
  client: z.string().min(1, "El campo 'Cliente' es requerido"),
  jornal: z.number().min(1, "El campo 'Jornal' es requerido"),
});

export const editPresupuestoSchema = z.object({
  idPrespuesto: z.number().min(1, "El campo 'idPrespuesto' es requerido"),
  namePresupuesto: z
    .string()
    .min(1, "El campo 'Nombre de presupuesto' es requerido"),
  nameUser: z.string().min(1, "El campo 'Nombre de usuario' es requerido"),
  pais: z.number().min(1, "El campo 'Pais' es requerido"),
  departamento: z.number().min(1, "El campo 'Departamento' es requerido"),
  provincia: z.number().min(1, "El campo 'Provincia' es requerido"),
  distrito: z.number().min(1, "El campo 'Distrito' es requerido"),
  client: z.string().min(1, "El campo 'Cliente' es requerido"),
  jornal: z.number().min(1, "El campo 'Jornal' es requerido"),
});

export const deletePresupuestoSchema = z.object({
  id: z.number().min(1, "El campo 'Pre_Id' es requerido"),
});

export const crearGrupoPartidaSchema = z.object({
  nombreGrupoPartida: z.string().min(1, "El campo 'Nombre del grupo de partida' es requerido"),
  idProyecto: z.string().min(1, "El campo 'Id de proyecto' es requerido"),
  idLastGroupPartida: z.string(),
});