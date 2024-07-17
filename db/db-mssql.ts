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
  connectionTimeout: 30000, // Aumenta el tiempo de espera de conexión a 30 segundos
  requestTimeout: 30000, // Aumenta el tiempo de espera de solicitud a 30 segundos
  stream: false,
  options: {
    encrypt: true, // Si estás usando Azure SQL, necesitas habilitar el cifrado
    enableArithAbort: true,
    trustServerCertificate: false, // Cambia a true solo si estás en desarrollo y sabes lo que haces
  },
  parseJSON: false,
  arrayRowMode: false,
};

const maxRetries = 2; // Número máximo de reintentos
const retryDelay = 1000; // Tiempo de espera entre reintentos (en milisegundos)

async function connectWithRetry(retries: number): Promise<sql.ConnectionPool> {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    console.log("Connected to MSSQL");
    return pool;
  } catch (err) {
    if (retries <= 0) {
      console.error("Database Connection Failed! Bad Config: ", err);
      process.exit(1);
    } else {
      console.warn(
        `Connection failed. Retrying in ${retryDelay / 1000} seconds... (${retries} retries left)`
      );
      await new Promise((res) => setTimeout(res, retryDelay));
      return connectWithRetry(retries - 1);
    }
  }
}

const poolPromise = connectWithRetry(maxRetries);

process.on("SIGINT", async () => {
  const pool = await poolPromise;
  pool.close(() => {
    console.log("Pool was closed.");
  });
});

export { poolPromise, sql };
