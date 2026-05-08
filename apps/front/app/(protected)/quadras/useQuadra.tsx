'use client'

import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function useQuadra(){
    const [loading,setLoading] = useState(false);
    const [quadras,setQuadras] = useState([]);
    const [formData,setFormData] = useState({});
    
    async function carregarQuadras() {
        const params = new URLSearchParams();

        try {
            setLoading(true);

            const dados = await apiRequest(`/quadras?`);

            setQuadras(dados);

        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro interno');
        }
        finally{
            setLoading(false);
        }
    }

    function handleChange(e){
        const {name, value} = e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    useEffect(()=>{
        carregarQuadras();
    },[]);

    return{
        loading,
        quadras,
    }
}