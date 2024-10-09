import { DB } from "@/lib/types/typesDB";
import { createKysely } from "@vercel/postgres-kysely";

let dbInstance: ReturnType<typeof createKysely<DB>> | null = null;

export function getDbPostgres(): ReturnType<typeof createKysely<DB>> {
  if (!dbInstance) {
    dbInstance = createKysely<DB>();
  }
  return dbInstance;
}
