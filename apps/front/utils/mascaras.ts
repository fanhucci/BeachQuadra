
export const cpfMask = (value:string):string =>{
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
}

export const telefoneMask = (value:string):string =>{
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
}

export const dinheiroMask = (value:string|number):string =>{

    const cleanValue = String(value).replace(/\D/g, "");
    
    if (!cleanValue) return "R$ 0,00";

    const centavos = parseInt(cleanValue, 10) / 100;

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(centavos);
}
