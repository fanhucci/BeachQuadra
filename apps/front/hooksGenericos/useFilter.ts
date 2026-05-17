'use client'

import { useMemo, useState, useEffect } from "react";

interface BasePagination{
    page:number;
    limit:number
}

export default function useFilter<F extends object>(valoresIniciais: F & BasePagination, delay: number = 500) {
    const [filters, setFilters] = useState<F & BasePagination>(valoresIniciais);
    const [debouncedFilters, setDebouncedFilters] = useState<F & BasePagination>(valoresIniciais);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, delay);

        return () => clearTimeout(handler); 
    }, [filters, delay]);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                let valorEmString = value;

                if (value instanceof Date) {
                    valorEmString = value.toISOString().split('T')[0];
                }
                
                if (typeof value === 'string' && value.includes('T') && value.length > 10) {
                    valorEmString = value.split('T')[0];
                }

                params.append(key, String(valorEmString));
            }
        });

        const res = params.toString();
        return res ? `?${res}` : '';
    }, [debouncedFilters]);

    const handleFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const proximaPagina = ()=>{
       
        setFilters((prev)=>{
            const valor = Number(prev.page)+1;
            return{
                ...prev,
                page:valor
            }
        });
    }

    const voltarPagina = ()=>{
        
        setFilters((prev)=>{
            const valor = Number(prev.page)-1;
            return{
                ...prev,
                page: valor<=0? 1 : valor 
            }
        });
    }

    const limparFiltros = () => setFilters(valoresIniciais);

    return {
        queryString,
        filters,
        handleFilters,
        limparFiltros,
        proximaPagina,
        voltarPagina
    }
}