import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
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
