"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { Session } from "next-auth";

interface IPropsAbly {
  children: React.ReactNode;
  session: Session | null;
}

export const AblyPimary = ({ children, session }: IPropsAbly) => {
  const clientAbly = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
  });

  return (
    <AblyProvider client={clientAbly}>
      <ChannelProvider
        channelName={process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME!}
        deriveOptions={{
          filter: `headers.userId == "${String(session?.user?.id)}" || headers.globalChannel == "true"`,
        }}
      >
        {children}
      </ChannelProvider>
    </AblyProvider>
  );
};
