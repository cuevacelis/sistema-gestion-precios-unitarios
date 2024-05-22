import { useEffect, useState } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = (): WindowSize => {
  // Inicializa el estado con el tamaño de la ventana
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler para llamar cuando la ventana cambie de tamaño
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Añade el evento listener
    window.addEventListener("resize", handleResize);

    // Llama al handler inmediatamente para establecer el tamaño inicial
    handleResize();

    // Limpia el listener cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Solo corre una vez, similar a componentDidMount

  return windowSize;
};

export default useWindowSize;
