import { Metadata } from "next";
import ProyectosComponent from "./proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
};

interface IProps {
  params: {
    id: string;
  };
}

export default function ProyectPage(props: IProps) {
  return (
    <main className="block p-4 lg:p-6">
      <ProyectosComponent />
    </main>
  );
}
