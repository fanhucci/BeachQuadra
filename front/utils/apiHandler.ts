const base_url = 'http://localhost:3000';

export async function apiRequest(endpoint:string, options:RequestInit = {}){
    const token = localStorage.getItem('token');

    const headers:HeadersInit  = {
        "Content-Type":"application/json",
        ...(options.headers || {}),
    };

    if(token){
        headers["Authorization"]=`Bearer ${token}`;
    }

    const response = await fetch(`${base_url}${endpoint}`,{
        ...options,
        headers
    });
    
    const contentType = response.headers.get("content-type");

    const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : null
    ;

    if(!response.ok){
        throw new Error(data?.erro || `Erro HTTP ${response.status}`);
    }

    return data;
}