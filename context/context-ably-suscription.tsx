"use client";
import * as Ably from "ably";
import { useChannel } from "ably/react";
import { toast } from "sonner";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Toaster } from "@/components/ui/sonner";

interface IContextProps {
  messagesNotification: Ably.Message[];
  setMessagesNotification: Dispatch<SetStateAction<Ably.Message[]>>;
  channel: Ably.RealtimeChannel;
}

interface IPropsAbly {
  children: React.ReactNode;
}

const AblySuscriptionContext = createContext<IContextProps | undefined>(
  undefined
);

export default function AblySuscriptionProvider({ children }: IPropsAbly) {
  const [messagesNotification, setMessagesNotification] = useState<
    Ably.Message[]
  >(() => {
    // const storedNotifications = localStorage.getItem("notifications");
    // if (storedNotifications) {
    //   const parsedNotifications = JSON.parse(storedNotifications);
    //   const now = Date.now();
    //   // Filtrar las notificaciones que tienen más de 1 día
    //   return parsedNotifications.filter(
    //     (notification: any) => now - notification.timestamp < 86400000
    //   );
    // }
    return [];
  });

  const { channel } = useChannel(
    {
      channelName: String(process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME),
    },
    (message) => {
      toast(String(message.data.title), {
        description: String(message.data.body),
        action: {
          label: "Ir",
          onClick: (e) => {
            e.stopPropagation();
            if (message.data.link) {
              const a = document.createElement("a");
              a.href = message.data.link;
              a.download = "";
              a.target = "_blank";
              a.click();
            } else {
              message.data.action && message.data.action();
            }
            // Marcar como leída
            markAsRead(String(message.id));
          },
        },
      });

      const updatedNotifications = [...messagesNotification, message];
      setMessagesNotification(updatedNotifications);

      // Guardar en localStorage
      // localStorage.setItem(
      //   "notifications",
      //   JSON.stringify(updatedNotifications)
      // );
    }
  );

  // Marcar una notificación como leída
  const markAsRead = (id: string) => {
    setMessagesNotification((prevState) => {
      const updatedNotifications = prevState.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              extras: { ...notification.extras, isRead: true },
            }
          : notification
      );

      // Guardar en localStorage
      // localStorage.setItem(
      //   "notifications",
      //   JSON.stringify(updatedNotifications)
      // );

      return updatedNotifications;
    });
  };

  return (
    <AblySuscriptionContext.Provider
      value={{ messagesNotification, setMessagesNotification, channel }}
    >
      <Toaster />
      {children}
    </AblySuscriptionContext.Provider>
  );
}

export const useAblySuscription = () => {
  const context = useContext(AblySuscriptionContext);
  if (context === undefined) {
    throw new Error("Error context AblySuscription");
  }
  return context;
};
