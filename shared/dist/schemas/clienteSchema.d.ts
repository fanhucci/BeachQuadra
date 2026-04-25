import { z } from "zod";
export declare const ClienteSchema: z.ZodObject<{
    id_cliente: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    nome: z.ZodString;
    cpf: z.ZodString;
    telefone: z.ZodString;
    usuario: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    nome: string;
    cpf: string;
    telefone: string;
    id_cliente?: number | null | undefined;
    usuario?: number | null | undefined;
}, {
    nome: string;
    cpf: string;
    telefone: string;
    id_cliente?: number | null | undefined;
    usuario?: number | null | undefined;
}>;
export type ClienteDTO = z.infer<typeof ClienteSchema>;
export declare const NovoClienteSchema: z.ZodObject<Omit<{
    id_cliente: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    nome: z.ZodString;
    cpf: z.ZodString;
    telefone: z.ZodString;
    usuario: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "id_cliente">, "strip", z.ZodTypeAny, {
    nome: string;
    cpf: string;
    telefone: string;
    usuario?: number | null | undefined;
}, {
    nome: string;
    cpf: string;
    telefone: string;
    usuario?: number | null | undefined;
}>;
export type NovoClienteDTO = z.infer<typeof NovoClienteSchema>;
export declare const EditarClienteSchema: z.ZodObject<{
    id_cliente: z.ZodNullable<z.ZodNumber>;
    nome: z.ZodString;
    cpf: z.ZodString;
    telefone: z.ZodString;
    usuario: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    id_cliente: number | null;
    nome: string;
    cpf: string;
    telefone: string;
    usuario?: number | null | undefined;
}, {
    id_cliente: number | null;
    nome: string;
    cpf: string;
    telefone: string;
    usuario?: number | null | undefined;
}>;
export type EditarClienteDTO = z.infer<typeof EditarClienteSchema>;
