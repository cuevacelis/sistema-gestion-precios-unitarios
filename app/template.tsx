import NavbarComponent from "./_components/navbar/navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarComponent />
      {children}
    </>
  );
}
