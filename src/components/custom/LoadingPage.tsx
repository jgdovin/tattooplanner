export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader2"></div>
      <h1 className="text-2xl font-bold font-mono">
        Loading<span className="text-red-500">...</span>
      </h1>
    </div>
  );
}
