import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  message: string[] | string | undefined;
}

export default function ErrorMessage({ message }: IProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="flex flex-row gap-2 items-start overflow-auto"
      aria-live="polite"
      aria-atomic="true"
    >
      <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
      {typeof message === "string" ||
      (Array.isArray(message) && message.length === 1) ? (
        <p className="w-auto text-sm text-red-500">{message}</p>
      ) : (
        <ul className="list-disc list-inside text-sm text-red-500">
          {message.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
