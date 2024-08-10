"use client";
import { Toaster } from "@/components/ui/sonner";
import * as Ably from "ably";
import { useChannel, useConnectionStateListener } from "ably/react";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface IContextProps {
  messagesNotification: Ably.Message[];
  channel: Ably.RealtimeChannel;
}

interface IPropsAbly {
  children: React.ReactNode;
}

const AblySuscriptionContext = createContext<IContextProps | undefined>(
  undefined
);

export const AblySuscriptionProvider = ({ children }: IPropsAbly) => {
  const [messagesNotification, setMessagesNotification] = useState<
    Ably.Message[]
  >([]);

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  const { channel } = useChannel(
    {
      channelName: String(process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME),
    },
    (message) => {
      toast(String(message.data.notification.title), {
        description: String(message.data.notification.body),
        action: {
          label: "Ir",
          onClick: () => alert("github"),
        },
      });
      setMessagesNotification((previousMessages) => [
        ...previousMessages,
        message,
      ]);
    }
  );

  return (
    <AblySuscriptionContext.Provider value={{ messagesNotification, channel }}>
      <Toaster />
      {children}
    </AblySuscriptionContext.Provider>
  );
};

export const useAblySuscription = () => {
  const context = useContext(AblySuscriptionContext);
  if (context === undefined) {
    throw new Error("Error context AblySuscription");
  }
  return context;
};
