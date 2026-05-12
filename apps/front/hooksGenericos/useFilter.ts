'use client'

import { useMemo, useState } from "react";

export default function useFilter<F extends object>(valoresIniciais:F){

    const [filters,setFilters] = useState<F>(valoresIniciais);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, String(value));
            }
        });

        const res = params.toString();
        return res ? `?${res}` : '';
    }, [filters]);

    const handleFilters = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        const {name, value} = e.target;

        setFilters((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    return{
        queryString,
        filters,
        handleFilters,
    }
}