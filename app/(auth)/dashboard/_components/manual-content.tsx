import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const manualSections = [
  {
    title: "Introducción",
    content:
      "Bienvenido al manual de usuario del sistema de Cálculo de Precios Unitarios (CALCPU). Este manual le guiará a través de las principales funcionalidades del sistema y cómo utilizarlas eficientemente.",
  },
  {
    title: "1. Ingreso al Sistema",
    content:
      "Para comenzar, acceda al sistema a través del enlace proporcionado. Si es su primera vez, necesitará ingresar con un usuario administrador para crear los primeros usuarios del sistema.",
  },
  {
    title: "2. Gestión de Clientes",
    content:
      "En esta sección, podrá gestionar los clientes de los distintos proyectos creados. Puede crear nuevos clientes, editar la información existente o eliminar registros según sea necesario.",
  },
  {
    title: "3. Gestión de Proyectos",
    content:
      "Aquí podrá administrar todos sus proyectos. Puede crear nuevos proyectos, actualizar la información de los existentes, eliminar proyectos y exportar la lista de proyectos a Excel.",
  },
  {
    title: "4. Hoja de Presupuesto",
    content:
      "En esta sección podrá visualizar de manera general las partidas y subpartidas de un proyecto específico.",
  },
  {
    title: "5. Índices Unificados",
    content:
      "Aquí encontrará los índices de precios unificados que pueden ser utilizados como referencia para la creación de nuevos recursos.",
  },
  {
    title: "6. Grupos de Partida",
    content:
      "En esta opción podrá gestionar los grupos de partida. Puede crear nuevos grupos, asignarlos a proyectos específicos, y agregar subgrupos de partidas según sea necesario.",
  },
  {
    title: "7. Partidas",
    content:
      "Aquí podrá gestionar las partidas de un determinado grupo de partida. Puede crear nuevas partidas, asignar recursos, y consultar precios recomendados obtenidos del diario el comercio.",
  },
  {
    title: "8. Recursos",
    content:
      "En esta sección podrá gestionar los recursos utilizados en las partidas. Puede crear nuevos recursos, especificando detalles como el valor de indunificado, nombre, tipo de recurso y unidad de medida.",
  },
];

export function ManualContent() {
  //const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Manual de Usuario
        </CardTitle>
        <CardDescription>
          Guía completa para el uso del sistema de Cálculo de Precios Unitarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <Accordion type="single" collapsible className="w-full">
            {manualSections.map((section, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-medium">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose dark:prose-invert max-w-none pt-2">
                    <p>{section.content}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
