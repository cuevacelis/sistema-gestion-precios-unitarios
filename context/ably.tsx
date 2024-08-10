"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

interface IPropsAbly {
  children: React.ReactNode;
}

const client = new Ably.Realtime({
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
});

export const AblyPimary = ({ children }: IPropsAbly) => {
  return (
    <AblyProvider client={client}>
      <ChannelProvider
        channelName={String(process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME)}
      >
        {children}
      </ChannelProvider>
    </AblyProvider>
  );
};
