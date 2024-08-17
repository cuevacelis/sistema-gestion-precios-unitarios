import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;

export default function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  const isActiveCache = process.env.NEXT_PUBLIC_ACTIVE_CACHE === "true";
  if (isActiveCache) {
    return nextCache(reactCache(cb), keyParts, options);
  }
  return reactCache(cb);
}
