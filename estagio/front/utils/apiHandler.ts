const base_url = 'http://localhost:3000';

export async function apiRequest(endpoint:string, options:RequestInit = {}){
    try{
        const response = await fetch(`${base_url}${endpoint}`,{
            ...options,
            headers:{
                "Content-Type":"application/json",
                ...options.headers,
            }

        })

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")){
            return await response.json();
        }

        return response;
    }
    catch(error){
        console.error("Erro na API: ",error);
        alert("Ocorreu um erro ao processar a solicitação.");
        throw error;
    }
}