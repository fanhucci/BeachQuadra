export default function Carregando() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      <p className="text-lg font-medium text-gray-700">Carregando seus dados...</p>
    </div>
  );
}