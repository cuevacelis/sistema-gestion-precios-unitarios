"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import type { Session } from "next-auth";
import { useMemo } from "react";

interface IPropsAbly {
	children: React.ReactNode;
	session: Session | null;
}

export default function AblyPimary({ children, session }: IPropsAbly) {
	const clientAbly = useMemo(() => {
		const clientAbly = new Ably.Realtime({
			key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
		});

		return clientAbly;
	}, []);

	const deriveOptions = {
		filter: `headers.userId == \`"${String(session?.user?.id)}"\` || headers.globalChannel == \`"true"\``,
	};

	return (
		<AblyProvider client={clientAbly}>
			<ChannelProvider
				channelName={process.env.NEXT_PUBLIC_ABLY_CHANNEL_NAME!}
				deriveOptions={deriveOptions}
			>
				{children}
			</ChannelProvider>
		</AblyProvider>
	);
}
