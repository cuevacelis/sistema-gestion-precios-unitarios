"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

interface IPropsAbly {
  children: React.ReactNode;
}

export const AblyPimary = ({ children }: IPropsAbly) => {
  const clientAbly = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
  });

  return (
    <AblyProvider client={clientAbly}>
      <ChannelProvider
        channelName={String(process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME)}
      >
        {children}
      </ChannelProvider>
    </AblyProvider>
  );
};
