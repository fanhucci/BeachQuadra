export default function LoadingSpinner() {

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <span className="text-sm font-medium text-gray-600">Carregando...</span>
        </div>
    );
}