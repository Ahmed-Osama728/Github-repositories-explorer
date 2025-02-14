interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div 
      className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
      role="alert"
    >
      {message}
    </div>
  );
}