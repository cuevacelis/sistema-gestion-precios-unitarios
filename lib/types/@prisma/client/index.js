
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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


  const path = require('path')

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/cuevacelis/personales/sistema-gestion-precios-unitarios/lib/types/@prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../../../prisma",
  "clientVersion": "5.12.1",
  "engineVersion": "473ed3124229e22d881cb7addf559799debae1ab",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlserver",
  "postinstall": true,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../lib/types/@prisma/client\"\n}\n\ndatasource db {\n  provider = \"sqlserver\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel cliente {\n  Cli_Id              Int            @id(map: \"PK_cliente\") @default(autoincrement())\n  Cli_NomApeRazSocial String         @db.VarChar(500)\n  Cli_Abreviatura     String         @db.VarChar(100)\n  Cli_NumDocumento    String         @db.VarChar(12)\n  TipDoc_Id           Int\n  Cli_Estado          Int            @default(1, map: \"DF_cliente_Cli_Estado\") @db.TinyInt\n  tipo_documento      tipo_documento @relation(fields: [TipDoc_Id], references: [TipDoc_Id], onUpdate: NoAction, map: \"FK_cliente_tipo_documento\")\n  presupuesto         presupuesto[]\n}\n\nmodel detalle_partida_recurso {\n  DetParRec_Id Int     @id(map: \"PK_detalle_partida_recurso\") @default(autoincrement())\n  Par_Id       Int\n  Rec_Id       Int\n  partida      partida @relation(fields: [Par_Id], references: [Par_Id], onUpdate: NoAction, map: \"FK_detalle_partida_recurso_partida\")\n  recurso      recurso @relation(fields: [Rec_Id], references: [Rec_Id], onUpdate: NoAction, map: \"FK_detalle_partida_recurso_recurso\")\n}\n\nmodel detalle_rol_modulo {\n  DetRolMod_Id     Int    @id(map: \"PK_detalle_rol_modulo\") @default(autoincrement())\n  Rol_Id           Int\n  Mod_Id           Int\n  DetRolMod_Estado Int    @default(1, map: \"DF_detalle_rol_modulo_DetRolMod_Estado\") @db.TinyInt\n  modulo           modulo @relation(fields: [Mod_Id], references: [Mod_Id], onUpdate: NoAction, map: \"FK_detalle_rol_modulo_modulo\")\n  rol              rol    @relation(fields: [Rol_Id], references: [Rol_Id], onUpdate: NoAction, map: \"FK_detalle_rol_modulo_rol\")\n}\n\nmodel grupo_partida {\n  GruPar_Id            Int                  @id(map: \"PK_sub_presupuesto\") @default(autoincrement())\n  NomGruPar_Id         Int\n  GruPar_Total         Decimal?             @db.Decimal(18, 0)\n  GruParPadre_Id       Int?\n  Pre_Id               Int\n  grupo_partida        grupo_partida?       @relation(\"grupo_partidaTogrupo_partida\", fields: [GruParPadre_Id], references: [GruPar_Id], onDelete: NoAction, onUpdate: NoAction, map: \"FK__grupo_par__GruPa__44952D46\")\n  other_grupo_partida  grupo_partida[]      @relation(\"grupo_partidaTogrupo_partida\")\n  nombre_grupo_partida nombre_grupo_partida @relation(fields: [NomGruPar_Id], references: [NomGruPar_Id], onUpdate: NoAction, map: \"FK__grupo_par__NomGr__56B3DD81\")\n  presupuesto          presupuesto          @relation(fields: [Pre_Id], references: [Pre_Id], onUpdate: NoAction, map: \"FK__grupo_par__Pre_I__4589517F\")\n  partida              partida[]\n}\n\nmodel modulo {\n  Mod_Id             Int                  @id(map: \"PK_modulo\") @default(autoincrement())\n  Mod_Nombre         String               @db.VarChar(100)\n  Mod_Estado         Int                  @default(1, map: \"DF_modulo_Mod_Estado\") @db.TinyInt\n  detalle_rol_modulo detalle_rol_modulo[]\n}\n\nmodel nombre_grupo_partida {\n  NomGruPar_Id     Int             @id(map: \"PK__unidad_m__3E5A5CCB499FDD75\") @default(autoincrement())\n  NomGruPar_Nombre String          @db.VarChar(500)\n  grupo_partida    grupo_partida[]\n}\n\nmodel partida {\n  Par_Id                    Int                       @id(map: \"PK_partida\") @default(autoincrement())\n  Par_Item                  String                    @db.VarChar(50)\n  Par_Nombre                String                    @db.VarChar(50)\n  UniMedRen_Id              Int\n  Par_RenManObra            Decimal                   @db.Decimal(18, 0)\n  Par_RenEquipo             Decimal                   @db.Decimal(18, 0)\n  UniMed_Id                 Int\n  Par_PreUnitario           Decimal?                  @db.Decimal(18, 0)\n  GruPar_Id                 Int\n  Par_Estado                Int                       @default(1, map: \"DF_partida_Par_Estado\") @db.TinyInt\n  detalle_partida_recurso   detalle_partida_recurso[]\n  grupo_partida             grupo_partida             @relation(fields: [GruPar_Id], references: [GruPar_Id], onUpdate: NoAction, map: \"FK__partida__GruPar___467D75B8\")\n  unidad_medida             unidad_medida             @relation(fields: [UniMed_Id], references: [UniMed_Id], onUpdate: NoAction, map: \"FK_partida_unidad_medida\")\n  unidad_medida_rendimiento unidad_medida_rendimiento @relation(fields: [UniMedRen_Id], references: [UniMedRen_Id], onUpdate: NoAction, map: \"FK_partida_unidad_medida_rendimiento\")\n}\n\nmodel presupuesto {\n  Pre_Id             Int             @id(map: \"PK_presupuesto\") @default(autoincrement())\n  Pre_Codigo         String?         @db.VarChar(50)\n  Usu_Id             Int\n  Pre_Nombre         String          @db.VarChar(500)\n  Cli_Id             Int\n  Ubi_Id             Int\n  Pre_Jornal         Decimal         @db.Decimal(18, 2)\n  Pre_FecHorRegistro DateTime        @default(now(), map: \"DF_presupuesto_Pre_FecHorRegistro\") @db.DateTime\n  Pre_Estado         Int             @default(1, map: \"DF_presupuesto_Pre_Estado\") @db.TinyInt\n  grupo_partida      grupo_partida[]\n  cliente            cliente         @relation(fields: [Cli_Id], references: [Cli_Id], onUpdate: NoAction, map: \"FK__presupues__Cli_I__1A9EF37A\")\n  ubicacion          ubicacion       @relation(fields: [Ubi_Id], references: [Ubi_Id], onUpdate: NoAction, map: \"FK__presupues__Ubi_I__19AACF41\")\n  usuario            usuario         @relation(fields: [Usu_Id], references: [Usu_Id], onUpdate: NoAction, map: \"FK_presupuesto_usuario\")\n}\n\nmodel recurso {\n  Rec_Id                  Int                       @id(map: \"PK_recurso\") @default(autoincrement())\n  Rec_Nombre              String                    @db.VarChar(100)\n  TipRec_Id               Int\n  UniMedRec_Id            Int\n  Rec_Cuadrilla           Decimal                   @db.Decimal(18, 0)\n  Rec_Cantidad            Decimal                   @db.Decimal(18, 0)\n  Rec_Precio              Decimal?                  @db.Decimal(18, 0)\n  Rec_Parcial             Decimal?                  @db.Decimal(18, 0)\n  Rec_Estado              Int                       @default(1, map: \"DF_recurso_Rec_Estado\") @db.TinyInt\n  detalle_partida_recurso detalle_partida_recurso[]\n  tipo_recurso            tipo_recurso              @relation(fields: [TipRec_Id], references: [TipRec_Id], onUpdate: NoAction, map: \"FK_recurso_tipo_recurso\")\n  unidad_medida_recurso   unidad_medida_recurso     @relation(fields: [UniMedRec_Id], references: [UniMedRec_Id], onUpdate: NoAction, map: \"FK_recurso_unidad_medida_recurso\")\n}\n\nmodel rol {\n  Rol_Id             Int                  @id(map: \"PK_rol\") @default(autoincrement())\n  Rol_Nombre         String               @db.VarChar(50)\n  Rol_Estado         Int                  @default(1, map: \"DF_rol_Rol_Estado\") @db.TinyInt\n  detalle_rol_modulo detalle_rol_modulo[]\n  usuario            usuario[]\n}\n\nmodel sysdiagrams {\n  name         String @db.NVarChar(128)\n  principal_id Int\n  diagram_id   Int    @id(map: \"PK__sysdiagr__C2B05B61A842D780\") @default(autoincrement())\n  version      Int?\n  definition   Bytes?\n\n  @@unique([principal_id, name], map: \"UK_principal_name\")\n}\n\nmodel tipo_documento {\n  TipDoc_Id     Int       @id(map: \"PK_tipo_documento\") @default(autoincrement())\n  TipDoc_Nombre String    @db.VarChar(50)\n  cliente       cliente[]\n}\n\nmodel tipo_recurso {\n  TipRec_Id     Int       @id(map: \"PK_tipo_recurso\") @default(autoincrement())\n  TipRec_Nombre String    @db.VarChar(100)\n  recurso       recurso[]\n}\n\nmodel ubicacion {\n  Ubi_Id           Int           @id(map: \"PK__ubicacio__40E1F317CBBEEB9F\")\n  Ubi_Departamento String        @db.NVarChar(100)\n  Ubi_Provincia    String        @db.NVarChar(100)\n  Ubi_Distrito     String        @db.NVarChar(100)\n  presupuesto      presupuesto[]\n}\n\nmodel unidad_medida {\n  UniMed_Id          Int       @id(map: \"PK_unidad_medida\") @default(autoincrement())\n  UniMed_Nombre      String    @db.VarChar(50)\n  UniMed_Abreviatura String    @db.VarChar(50)\n  UniMed_Estado      Int       @default(1, map: \"DF_unidad_medida_UniMed_Estado\") @db.TinyInt\n  partida            partida[]\n}\n\nmodel unidad_medida_recurso {\n  UniMedRec_Id          Int       @id(map: \"PK_unidad_medida_recurso\") @default(autoincrement())\n  UniMedRec_Nombre      String    @db.VarChar(100)\n  UniMedRec_Abreviatura Bytes     @db.VarBinary(50)\n  UniMedRec_Estado      Int       @default(1, map: \"DF_unidad_medida_recurso_UniMedRec_Estado\") @db.TinyInt\n  recurso               recurso[]\n}\n\nmodel unidad_medida_rendimiento {\n  UniMedRen_Id          Int       @id(map: \"PK_unidad_medida_rendimiento\") @default(autoincrement())\n  UniMedRen_Nombre      String    @db.VarChar(50)\n  UniMedRen_Abreviatura String    @db.VarChar(50)\n  UniMedRen_Estado      Int       @default(1, map: \"DF_unidad_medida_rendimiento_UniMedRen_Estado\") @db.TinyInt\n  partida               partida[]\n}\n\nmodel usuario {\n  Usu_Id                      Int           @id(map: \"PK_usuario\") @default(autoincrement())\n  Usu_Correo                  String        @db.VarChar(50)\n  Usu_Clave                   String        @db.VarChar(50)\n  Usu_NomApellidos            String        @db.VarChar(500)\n  Rol_Id                      Int\n  Usu_FecHoraRegistro         DateTime      @default(now(), map: \"DF__usuario__Usu_Fec__5224328E\") @db.DateTime\n  Usu_Observacion             String?       @db.VarChar(500)\n  Usu_Estado                  Int           @default(1, map: \"DF_usuario_Usu_Estado\") @db.TinyInt\n  Usu_TokenActualizado        String?       @db.NVarChar(Max)\n  Usu_FecHoraTokenActualizado DateTime?     @db.DateTime\n  presupuesto                 presupuesto[]\n  rol                         rol           @relation(fields: [Rol_Id], references: [Rol_Id], onUpdate: NoAction, map: \"FK_usuario_rol\")\n}\n",
  "inlineSchemaHash": "1f038abdfda9c42401f47833bff6555780ac2de540b046e5f6cd359493118651",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "lib/types/@prisma/client",
    "types/@prisma/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"cliente\":{\"dbName\":null,\"fields\":[{\"name\":\"Cli_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Cli_NomApeRazSocial\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Cli_Abreviatura\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Cli_NumDocumento\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TipDoc_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Cli_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipo_documento\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"tipo_documento\",\"relationName\":\"clienteTotipo_documento\",\"relationFromFields\":[\"TipDoc_Id\"],\"relationToFields\":[\"TipDoc_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"presupuesto\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"presupuesto\",\"relationName\":\"clienteTopresupuesto\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"detalle_partida_recurso\":{\"dbName\":null,\"fields\":[{\"name\":\"DetParRec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partida\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"partida\",\"relationName\":\"detalle_partida_recursoTopartida\",\"relationFromFields\":[\"Par_Id\"],\"relationToFields\":[\"Par_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recurso\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"recurso\",\"relationName\":\"detalle_partida_recursoTorecurso\",\"relationFromFields\":[\"Rec_Id\"],\"relationToFields\":[\"Rec_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"detalle_rol_modulo\":{\"dbName\":null,\"fields\":[{\"name\":\"DetRolMod_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rol_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Mod_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DetRolMod_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modulo\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"modulo\",\"relationName\":\"detalle_rol_moduloTomodulo\",\"relationFromFields\":[\"Mod_Id\"],\"relationToFields\":[\"Mod_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rol\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"rol\",\"relationName\":\"detalle_rol_moduloTorol\",\"relationFromFields\":[\"Rol_Id\"],\"relationToFields\":[\"Rol_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"grupo_partida\":{\"dbName\":null,\"fields\":[{\"name\":\"GruPar_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"NomGruPar_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"GruPar_Total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"GruParPadre_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Pre_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grupo_partida\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"grupo_partida\",\"relationName\":\"grupo_partidaTogrupo_partida\",\"relationFromFields\":[\"GruParPadre_Id\"],\"relationToFields\":[\"GruPar_Id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"other_grupo_partida\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"grupo_partida\",\"relationName\":\"grupo_partidaTogrupo_partida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre_grupo_partida\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"nombre_grupo_partida\",\"relationName\":\"grupo_partidaTonombre_grupo_partida\",\"relationFromFields\":[\"NomGruPar_Id\"],\"relationToFields\":[\"NomGruPar_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"presupuesto\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"presupuesto\",\"relationName\":\"grupo_partidaTopresupuesto\",\"relationFromFields\":[\"Pre_Id\"],\"relationToFields\":[\"Pre_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partida\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"partida\",\"relationName\":\"grupo_partidaTopartida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"modulo\":{\"dbName\":null,\"fields\":[{\"name\":\"Mod_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Mod_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Mod_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detalle_rol_modulo\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"detalle_rol_modulo\",\"relationName\":\"detalle_rol_moduloTomodulo\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"nombre_grupo_partida\":{\"dbName\":null,\"fields\":[{\"name\":\"NomGruPar_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"NomGruPar_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grupo_partida\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"grupo_partida\",\"relationName\":\"grupo_partidaTonombre_grupo_partida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"partida\":{\"dbName\":null,\"fields\":[{\"name\":\"Par_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_Item\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRen_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_RenManObra\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_RenEquipo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMed_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_PreUnitario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"GruPar_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Par_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detalle_partida_recurso\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"detalle_partida_recurso\",\"relationName\":\"detalle_partida_recursoTopartida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grupo_partida\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"grupo_partida\",\"relationName\":\"grupo_partidaTopartida\",\"relationFromFields\":[\"GruPar_Id\"],\"relationToFields\":[\"GruPar_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unidad_medida\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"unidad_medida\",\"relationName\":\"partidaTounidad_medida\",\"relationFromFields\":[\"UniMed_Id\"],\"relationToFields\":[\"UniMed_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unidad_medida_rendimiento\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"unidad_medida_rendimiento\",\"relationName\":\"partidaTounidad_medida_rendimiento\",\"relationFromFields\":[\"UniMedRen_Id\"],\"relationToFields\":[\"UniMedRen_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"presupuesto\":{\"dbName\":null,\"fields\":[{\"name\":\"Pre_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Pre_Codigo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Pre_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Cli_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Ubi_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Pre_Jornal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Pre_FecHorRegistro\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Pre_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grupo_partida\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"grupo_partida\",\"relationName\":\"grupo_partidaTopresupuesto\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cliente\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"cliente\",\"relationName\":\"clienteTopresupuesto\",\"relationFromFields\":[\"Cli_Id\"],\"relationToFields\":[\"Cli_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ubicacion\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ubicacion\",\"relationName\":\"presupuestoToubicacion\",\"relationFromFields\":[\"Ubi_Id\"],\"relationToFields\":[\"Ubi_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuario\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"usuario\",\"relationName\":\"presupuestoTousuario\",\"relationFromFields\":[\"Usu_Id\"],\"relationToFields\":[\"Usu_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"recurso\":{\"dbName\":null,\"fields\":[{\"name\":\"Rec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TipRec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Cuadrilla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Cantidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Precio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Parcial\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rec_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detalle_partida_recurso\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"detalle_partida_recurso\",\"relationName\":\"detalle_partida_recursoTorecurso\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipo_recurso\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"tipo_recurso\",\"relationName\":\"recursoTotipo_recurso\",\"relationFromFields\":[\"TipRec_Id\"],\"relationToFields\":[\"TipRec_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unidad_medida_recurso\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"unidad_medida_recurso\",\"relationName\":\"recursoTounidad_medida_recurso\",\"relationFromFields\":[\"UniMedRec_Id\"],\"relationToFields\":[\"UniMedRec_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"rol\":{\"dbName\":null,\"fields\":[{\"name\":\"Rol_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rol_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rol_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detalle_rol_modulo\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"detalle_rol_modulo\",\"relationName\":\"detalle_rol_moduloTorol\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuario\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"usuario\",\"relationName\":\"rolTousuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sysdiagrams\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"principal_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"diagram_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"definition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"principal_id\",\"name\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"principal_id\",\"name\"]}],\"isGenerated\":false},\"tipo_documento\":{\"dbName\":null,\"fields\":[{\"name\":\"TipDoc_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TipDoc_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cliente\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"cliente\",\"relationName\":\"clienteTotipo_documento\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"tipo_recurso\":{\"dbName\":null,\"fields\":[{\"name\":\"TipRec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TipRec_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recurso\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"recurso\",\"relationName\":\"recursoTotipo_recurso\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ubicacion\":{\"dbName\":null,\"fields\":[{\"name\":\"Ubi_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Ubi_Departamento\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Ubi_Provincia\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Ubi_Distrito\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"presupuesto\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"presupuesto\",\"relationName\":\"presupuestoToubicacion\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"unidad_medida\":{\"dbName\":null,\"fields\":[{\"name\":\"UniMed_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMed_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMed_Abreviatura\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMed_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partida\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"partida\",\"relationName\":\"partidaTounidad_medida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"unidad_medida_recurso\":{\"dbName\":null,\"fields\":[{\"name\":\"UniMedRec_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRec_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRec_Abreviatura\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRec_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recurso\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"recurso\",\"relationName\":\"recursoTounidad_medida_recurso\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"unidad_medida_rendimiento\":{\"dbName\":null,\"fields\":[{\"name\":\"UniMedRen_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRen_Nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRen_Abreviatura\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UniMedRen_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partida\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"partida\",\"relationName\":\"partidaTounidad_medida_rendimiento\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"usuario\":{\"dbName\":null,\"fields\":[{\"name\":\"Usu_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_Correo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_Clave\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_NomApellidos\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Rol_Id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_FecHoraRegistro\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_Observacion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_Estado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_TokenActualizado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Usu_FecHoraTokenActualizado\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"presupuesto\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"presupuesto\",\"relationName\":\"presupuestoTousuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rol\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"rol\",\"relationName\":\"rolTousuario\",\"relationFromFields\":[\"Rol_Id\"],\"relationToFields\":[\"Rol_Id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "lib/types/@prisma/client/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "lib/types/@prisma/client/schema.prisma")
