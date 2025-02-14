export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center" role="status">
      <div 
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        aria-label="Loading"
      />
    </div>
  );
}