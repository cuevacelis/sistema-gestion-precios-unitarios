import { useEffect, useState } from "react";

export function useUserAgent() {
	const [userAgent, setUserAgent] = useState<string | null>(null);

	useEffect(() => {
		if (typeof navigator !== "undefined") {
			setUserAgent(navigator.userAgent);
		}
	}, []);

	return userAgent;
}
