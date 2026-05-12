'use client'

import { useMemo, useState, useEffect } from "react";

export default function useFilter<F extends object>(valoresIniciais: F, delay: number = 500) {
    const [filters, setFilters] = useState<F>(valoresIniciais);
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const searchTerm = (filters as any).search || ''; 

        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, delay);

        return () => clearTimeout(handler);
    }, [(filters as any).nome, delay]);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (key === 'search') {
                    if (debouncedSearch) params.append(key, debouncedSearch);
                } else {
                    params.append(key, String(value));
                }
            }
        });

        const res = params.toString();
        return res ? `?${res}` : '';
    }, [filters, debouncedSearch]);

    const handleFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return {
        queryString,
        filters,
        handleFilters,
    }
}