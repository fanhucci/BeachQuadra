const base_url = process.env.NEXT_PUBLIC_BACK_URL;

export async function apiRequest(endpoint: string, options: RequestInit = {}) {

    const response = await fetch(`${base_url}${endpoint}`, {
        ...options,
        credentials: 'include', 
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const contentType = response.headers.get("content-type");

    const data =
        contentType && contentType.includes("application/json")
        ? await response.json()
        : null;

    if (!response.ok) {

        if (response.status === 403 && data.tipo === 'FORBIDDEN_AREA') {
            window.location.replace('/sem-permissao');
            return;
        }

        throw new Error(data?.erro || `Erro HTTP ${response.status}`);
    }

    return data;
}