import LoginFormComponent from "./_components/loginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-black dark:text-stone-300 text-4xl text-center">
        Login SGPU
      </h1>
      <LoginFormComponent />
    </main>
  );
}
