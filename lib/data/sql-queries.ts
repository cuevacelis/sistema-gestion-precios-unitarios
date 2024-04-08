import db from "@/scripts/db";
import { usuario } from "../types/@prisma/client";

interface UserCredentials {
  username: string;
  password: string;
}

export async function findUserByUsernameAndPassword(
  credentials: UserCredentials
): Promise<usuario | null> {
  try {
    const { username, password } = credentials;

    const user = await db.$queryRaw<usuario[]>`
      SELECT TOP 1 * FROM usuario
      WHERE Usu_Correo = ${username} AND Usu_Clave = ${password}
    `;

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error;
  }
}
