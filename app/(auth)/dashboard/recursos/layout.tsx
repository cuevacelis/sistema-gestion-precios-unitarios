import type React from "react";

interface IPropsLayout {
	children: React.ReactNode;
	modal: React.ReactNode;
}

export default function RecursosLayout({ children, modal }: IPropsLayout) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
