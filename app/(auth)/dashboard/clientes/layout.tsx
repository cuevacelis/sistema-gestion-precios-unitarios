import type React from "react";

interface IPropsLayout {
	children: React.ReactNode;
	// modal: React.ReactNode;
}

export default function ClientesLayout({ children }: IPropsLayout) {
	return (
		<>
			{children}
			{/* {modal} */}
		</>
	);
}
