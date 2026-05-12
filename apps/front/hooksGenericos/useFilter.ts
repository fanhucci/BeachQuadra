'use client'

import { useMemo, useState, useEffect } from "react";

export default function useFilter<F extends object>(valoresIniciais: F, delay: number = 500) {
    const [filters, setFilters] = useState<F>(valoresIniciais);
    const [debouncedFilters, setDebouncedFilters] = useState<F>(valoresIniciais);


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
                params.append(key, String(value));
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

    const limparFiltros = () => setFilters(valoresIniciais);

    return {
        queryString,
        filters,
        handleFilters,
        limparFiltros
    }
}