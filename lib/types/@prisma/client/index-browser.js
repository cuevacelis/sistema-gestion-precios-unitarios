
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.12.1
 * Query Engine version: 473ed3124229e22d881cb7addf559799debae1ab
 */
Prisma.prismaVersion = {
  client: "5.12.1",
  engine: "473ed3124229e22d881cb7addf559799debae1ab"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
  Snapshot: 'Snapshot'
});

exports.Prisma.ClienteScalarFieldEnum = {
  Cli_Id: 'Cli_Id',
  Cli_NomApeRazSocial: 'Cli_NomApeRazSocial',
  Cli_Abreviatura: 'Cli_Abreviatura',
  Cli_NumDocumento: 'Cli_NumDocumento',
  TipDoc_Id: 'TipDoc_Id',
  Cli_Estado: 'Cli_Estado'
};

exports.Prisma.Detalle_partida_recursoScalarFieldEnum = {
  DetParRec_Id: 'DetParRec_Id',
  Par_Id: 'Par_Id',
  Rec_Id: 'Rec_Id'
};

exports.Prisma.Detalle_rol_moduloScalarFieldEnum = {
  DetRolMod_Id: 'DetRolMod_Id',
  Rol_Id: 'Rol_Id',
  Mod_Id: 'Mod_Id',
  DetRolMod_Estado: 'DetRolMod_Estado'
};

exports.Prisma.Grupo_partidaScalarFieldEnum = {
  GruPar_Id: 'GruPar_Id',
  NomGruPar_Id: 'NomGruPar_Id',
  GruPar_Total: 'GruPar_Total',
  GruParPadre_Id: 'GruParPadre_Id',
  Pre_Id: 'Pre_Id'
};

exports.Prisma.ModuloScalarFieldEnum = {
  Mod_Id: 'Mod_Id',
  Mod_Nombre: 'Mod_Nombre',
  Mod_Estado: 'Mod_Estado'
};

exports.Prisma.Nombre_grupo_partidaScalarFieldEnum = {
  NomGruPar_Id: 'NomGruPar_Id',
  NomGruPar_Nombre: 'NomGruPar_Nombre'
};

exports.Prisma.PartidaScalarFieldEnum = {
  Par_Id: 'Par_Id',
  Par_Item: 'Par_Item',
  Par_Nombre: 'Par_Nombre',
  UniMedRen_Id: 'UniMedRen_Id',
  Par_RenManObra: 'Par_RenManObra',
  Par_RenEquipo: 'Par_RenEquipo',
  UniMed_Id: 'UniMed_Id',
  Par_PreUnitario: 'Par_PreUnitario',
  GruPar_Id: 'GruPar_Id',
  Par_Estado: 'Par_Estado'
};

exports.Prisma.PresupuestoScalarFieldEnum = {
  Pre_Id: 'Pre_Id',
  Pre_Codigo: 'Pre_Codigo',
  Usu_Id: 'Usu_Id',
  Pre_Nombre: 'Pre_Nombre',
  Cli_Id: 'Cli_Id',
  Ubi_Id: 'Ubi_Id',
  Pre_Jornal: 'Pre_Jornal',
  Pre_FecHorRegistro: 'Pre_FecHorRegistro',
  Pre_Estado: 'Pre_Estado'
};

exports.Prisma.RecursoScalarFieldEnum = {
  Rec_Id: 'Rec_Id',
  Rec_Nombre: 'Rec_Nombre',
  TipRec_Id: 'TipRec_Id',
  UniMedRec_Id: 'UniMedRec_Id',
  Rec_Cuadrilla: 'Rec_Cuadrilla',
  Rec_Cantidad: 'Rec_Cantidad',
  Rec_Precio: 'Rec_Precio',
  Rec_Parcial: 'Rec_Parcial',
  Rec_Estado: 'Rec_Estado'
};

exports.Prisma.RolScalarFieldEnum = {
  Rol_Id: 'Rol_Id',
  Rol_Nombre: 'Rol_Nombre',
  Rol_Estado: 'Rol_Estado'
};

exports.Prisma.SysdiagramsScalarFieldEnum = {
  name: 'name',
  principal_id: 'principal_id',
  diagram_id: 'diagram_id',
  version: 'version',
  definition: 'definition'
};

exports.Prisma.Tipo_documentoScalarFieldEnum = {
  TipDoc_Id: 'TipDoc_Id',
  TipDoc_Nombre: 'TipDoc_Nombre'
};

exports.Prisma.Tipo_recursoScalarFieldEnum = {
  TipRec_Id: 'TipRec_Id',
  TipRec_Nombre: 'TipRec_Nombre'
};

exports.Prisma.UbicacionScalarFieldEnum = {
  Ubi_Id: 'Ubi_Id',
  Ubi_Departamento: 'Ubi_Departamento',
  Ubi_Provincia: 'Ubi_Provincia',
  Ubi_Distrito: 'Ubi_Distrito'
};

exports.Prisma.Unidad_medidaScalarFieldEnum = {
  UniMed_Id: 'UniMed_Id',
  UniMed_Nombre: 'UniMed_Nombre',
  UniMed_Abreviatura: 'UniMed_Abreviatura',
  UniMed_Estado: 'UniMed_Estado'
};

exports.Prisma.Unidad_medida_recursoScalarFieldEnum = {
  UniMedRec_Id: 'UniMedRec_Id',
  UniMedRec_Nombre: 'UniMedRec_Nombre',
  UniMedRec_Abreviatura: 'UniMedRec_Abreviatura',
  UniMedRec_Estado: 'UniMedRec_Estado'
};

exports.Prisma.Unidad_medida_rendimientoScalarFieldEnum = {
  UniMedRen_Id: 'UniMedRen_Id',
  UniMedRen_Nombre: 'UniMedRen_Nombre',
  UniMedRen_Abreviatura: 'UniMedRen_Abreviatura',
  UniMedRen_Estado: 'UniMedRen_Estado'
};

exports.Prisma.UsuarioScalarFieldEnum = {
  Usu_Id: 'Usu_Id',
  Usu_Correo: 'Usu_Correo',
  Usu_Clave: 'Usu_Clave',
  Usu_NomApellidos: 'Usu_NomApellidos',
  Rol_Id: 'Rol_Id',
  Usu_FecHoraRegistro: 'Usu_FecHoraRegistro',
  Usu_Observacion: 'Usu_Observacion',
  Usu_Estado: 'Usu_Estado',
  Usu_TokenActualizado: 'Usu_TokenActualizado',
  Usu_FecHoraTokenActualizado: 'Usu_FecHoraTokenActualizado'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  cliente: 'cliente',
  detalle_partida_recurso: 'detalle_partida_recurso',
  detalle_rol_modulo: 'detalle_rol_modulo',
  grupo_partida: 'grupo_partida',
  modulo: 'modulo',
  nombre_grupo_partida: 'nombre_grupo_partida',
  partida: 'partida',
  presupuesto: 'presupuesto',
  recurso: 'recurso',
  rol: 'rol',
  sysdiagrams: 'sysdiagrams',
  tipo_documento: 'tipo_documento',
  tipo_recurso: 'tipo_recurso',
  ubicacion: 'ubicacion',
  unidad_medida: 'unidad_medida',
  unidad_medida_recurso: 'unidad_medida_recurso',
  unidad_medida_rendimiento: 'unidad_medida_rendimiento',
  usuario: 'usuario'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
