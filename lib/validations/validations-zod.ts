import { z } from "zod";

// #region CREDENTIALS
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

// #region USUARIOS
export const crearUsuarioSchema = z.object({
	correo: z.string().email({ message: "Correo electrónico no válido." }),
	clave: z
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
	nombre: z.string().min(1, "El campo 'Nombre' es requerido"),
	rol: z.string().min(1, "El campo 'Rol' es requerido"),
});

export const editarUsuarioSchema = z.object({
	idUsuario: z.number().min(1, "El campo 'Id de usuario' es requerido"),
	correo: z.string().email({ message: "Correo electrónico no válido." }),
	clave: z
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
	nombre: z.string().min(1, "El campo 'Nombre' es requerido"),
	rol: z.string().min(1, "El campo 'Rol' es requerido"),
	observacion: z.string().min(0, "El campo 'Observación' es requerido"),
});

export const cambioEstadoUsuarioSchema = z.object({
	idUsuario: z.number().min(1, "El campo 'Id de usuario' es requerido"),
	newState: z.number().min(0, "El campo 'Estado' es requerido"),
});

// #region CLIENTES
export const crearClienteSchema = z.object({
	nombre: z.string().min(1, "El campo 'Nombre' es requerido"),
	abreviatura: z.string().min(1, "El campo 'Abreviatura' es requerido"),
	tipoDoc: z.number().min(1, "El campo 'Tipo de documento' es requerido"),
	numeroDoc: z.string().min(1, "El campo 'Numero de documento' es requerido"),
});

export const editarClienteSchema = z.object({
	idCliente: z.number().min(1, "El campo 'Id de cliente' es requerido"),
	nombre: z.string().min(1, "El campo 'Nombre' es requerido"),
	abreviatura: z.string().min(1, "El campo 'Abreviatura' es requerido"),
	tipoDoc: z.number().min(1, "El campo 'Tipo de documento' es requerido"),
	numeroDoc: z.string().min(1, "El campo 'Numero de documento' es requerido"),
});

export const cambioEstadoClienteSchema = z.object({
	idCliente: z.number().min(1, "El campo 'Id de cliente' es requerido"),
	newState: z.number().min(0, "El campo 'Estado' es requerido"),
});

// #region PRESUPUESTOS
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

// #region GRUPOS DE PARTIDAS
export const crearGrupoPartidaSchema = z.object({
	idProyecto: z.string().min(1, "El campo 'Proyecto' es requerido"),
	nombreGrupoPartida: z
		.string()
		.min(1, "El campo 'Nombre del grupo de partida' es requerido"),
	idLastGroupPartida: z.string().nullable(),
});

export const editarGrupoPartidaSchema = z.object({
	idGrupoPartida: z.string().min(1, "El campo 'Grupo de partida' es requerido"),
	nombreGrupoPartida: z
		.string()
		.min(1, "El campo 'Nombre del grupo de partida' es requerido"),
});

export const deleteGrupoPartidaSchema = z.object({
	id: z.number().min(1, "El campo 'idGrupoPartida' es requerido"),
});

// #region PARTIDAS
export const crearPartidaSchema = z.object({
	idGrupoPartida: z.string().min(1, "El campo 'Grupo de partida' es requerido"),
	nombrePartida: z.string().min(1, "El campo 'Nombre de partida' es requerido"),
	rendimientoManoDeObra: z
		.number()
		.min(0, "El campo 'Rendimiento mano de obra' es requerido"),
	rendimientoEquipo: z
		.number()
		.min(0, "El campo 'Rendimiento equipo' es requerido"),
	unidadMedida: z.string().min(1, "El campo 'Unidad de medida' es requerido"),
});

export const editarPartidaSchema = z.object({
	idPartida: z.string().min(1, "El campo 'Id de partida' es requerido"),
	nombrePartida: z.string().min(1, "El campo 'Nombre de partida' es requerido"),
	rendimientoManoDeObra: z
		.number()
		.min(0, "El campo 'Rendimiento mano de obra' es requerido"),
	rendimientoEquipo: z
		.number()
		.min(0, "El campo 'Rendimiento equipo' es requerido"),
	unidadMedida: z.string().min(1, "El campo 'Unidad de medida' es requerido"),
});

export const deletePartidaSchema = z.object({
	idPartida: z.number().min(1, "El campo 'Id de partida' es requerido"),
});

// #region RECURSOS
export const crearRecursoSchema = z.object({
	nombreRecurso: z.string().min(1, "El campo 'Nombre de recurso' es requerido"),
	tipoRecurso: z.string().min(1, "El campo 'Tipo de recurso' es requerido"),
	unidadMedida: z.string().min(1, "El campo 'Unidad de medida' es requerido"),
	indunificado: z.string().min(1, "El campo 'Indunificado' es requerido"),
});

export const editarRecursoSchema = z.object({
	idRecurso: z.number().min(1, "El campo 'Id de recurso' es requerido"),
	nombreRecurso: z.string().min(1, "El campo 'Nombre de recurso' es requerido"),
	tipoRecurso: z.number().min(1, "El campo 'Tipo de recurso' es requerido"),
	unidadMedida: z.number().min(1, "El campo 'Unidad de medida' es requerido"),
	indunificado: z.string().min(1, "El campo 'Indunificado' es requerido"),
});

export const deleteRecursoSchema = z.object({
	idRecurso: z.string().min(1, "El campo 'Id de recurso' es requerido"),
});

export const asignarRecursoToPartidaSchema = z.object({
	idPartida: z.string().min(1, "El campo 'Id de partida' es requerido"),
	idRecurso: z.string().min(1, "El campo 'Id de recurso' es requerido"),
	cantidad: z.string().min(0, "El campo 'Cantidad' es requerido").nullable(),
	cuadrilla: z.string().min(0, "El campo 'Cuadrilla' es requerido").nullable(),
	precio: z.string().min(0, "El campo 'Precio' es requerido").nullable(),
});
