'use client'
import { useEffect, useState } from "react";



export default function useDashboard(){

    const [loading,setLoading] = useState<boolean>(false);

    const popularDashboard = async ()=>{
        try {
            setLoading(true)
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{

    },[])

    return{
        loading
    }
}