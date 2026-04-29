const base_url = 'https://beachquadra-api.onrender.com';

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
        throw new Error(data?.erro || `Erro HTTP ${response.status}`);
    }

    return data;
}