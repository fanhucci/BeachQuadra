const base_url = process.env.NEXT_PUBLIC_BACK_URL || `achou nao em` ;

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
        throw new Error(data?.erro || `Erro HTTP ${response.status}, ${base_url}`);
    }

    return data;
}