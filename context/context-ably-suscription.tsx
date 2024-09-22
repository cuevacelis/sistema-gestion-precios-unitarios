"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import * as Ably from "ably";
import { useChannel, useConnectionStateListener } from "ably/react";
import { createContext, useContext, useState } from "react";

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
  const { toast } = useToast();

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  const { channel } = useChannel(
    {
      channelName: String(process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME),
    },
    (message) => {
      toast({
        title: String(message.data.notification.title),
        description: String(message.data.notification.body),
        action: (
          <ToastAction altText="Try again" onClick={() => console.log("Undo")}>
            Undo
          </ToastAction>
        ),
      });
      setMessagesNotification((previousMessages) => [
        ...previousMessages,
        message,
      ]);
    }
  );

  return (
    <AblySuscriptionContext.Provider value={{ messagesNotification, channel }}>
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
