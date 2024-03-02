import LoginComponent from "./_components/form/login";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-black dark:text-stone-300 text-4xl text-center">
        Login
      </h1>
      <LoginComponent />
    </main>
  );
}
