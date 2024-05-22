import { kv } from "@vercel/kv";

interface IParamsPostSidebar {
  sidebarState: boolean;
  userId: number;
}

export async function changeSidebarState({
  sidebarState,
  userId,
}: IParamsPostSidebar) {
  return kv.set("sidebar-state" + userId, sidebarState);
}

export async function getSidebarState(userId: number) {
  return kv.get<boolean>("sidebar-state" + userId);
}
