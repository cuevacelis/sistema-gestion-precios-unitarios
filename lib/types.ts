//LOGIN
export interface IBodyLogin {
  username: string;
  password: string;
}

export interface IDataDBLogin {
  Usu_Id: number;
  Usu_Correo: string;
  Usu_Clave: string;
  Usu_NomApellidos: string;
  Rol_Id: number;
  Usu_FecHoraRegistro: string;
  Usu_Observacion: string;
  Usu_Estado: number;
  Usu_TokenActualizado: string;
  Usu_FecHoraTokenActualizado: string;
}

//USER LOGGED

export interface IDataDBSidebar {
  Mod_Id: number;
  Mod_Nombre: string;
  Mod_Estado: number;
}

//USER Presupuestos

export interface IDataDBObtenerPresupuestosPaginados {
  Pre_Id: number;
  Pre_Codigo: any;
  Usu_NomApellidos: string;
  Pre_Nombre: string;
  Cli_NomApeRazSocial: string;
  Ubi_Departamento: string;
  Ubi_Provincia: string;
  Ubi_Distrito: string;
  Pre_Jornal: number;
  Pre_FecHorRegistro: string;
  Pre_Estado: number;
}
