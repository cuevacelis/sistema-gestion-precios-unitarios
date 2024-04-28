import sql from "mssql";

const config: sql.config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: String(process.env.MSSQL_HOST),
  database: process.env.MSSQL_DATABASE,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  stream: false,
  options: {
    encrypt: false, // Si estás usando Azure SQL, necesitas habilitar el cifrado
    enableArithAbort: true,
    trustServerCertificate: process.env.NODE_ENV === "development", // Cambia a true solo si estás en desarrollo y sabes lo que haces
  },
  parseJSON: false,
  arrayRowMode: false,
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  const pool = await poolPromise;
  pool.close(() => {
    console.log("Pool was closed.");
  });
});

export { poolPromise, sql };
