import { z } from "zod";
export declare const CriarPessoaSchema: z.ZodObject<{
    nome: z.ZodString;
    cpf: z.ZodString;
    email: z.ZodString;
    telefone: z.ZodString;
    id_cargo: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
}, {
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
}>;
export type CriarPessoaDTO = z.infer<typeof CriarPessoaSchema>;
export declare const PessoaQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    tipo: z.ZodNumber;
    id_cargo: z.ZodOptional<z.ZodNumber>;
    ativo: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    tipo: number;
    search?: string | undefined;
    id_cargo?: number | undefined;
    ativo?: boolean | undefined;
}, {
    tipo: number;
    search?: string | undefined;
    id_cargo?: number | undefined;
    ativo?: string | undefined;
}>;
export type PessoaQueryDTO = z.infer<typeof PessoaQuerySchema>;
export declare const ListarPessoaSchema: z.ZodObject<{
    id_pessoa: z.ZodNumber;
    nome: z.ZodString;
    cpf: z.ZodString;
    email: z.ZodString;
    telefone: z.ZodString;
    id_cargo: z.ZodNumber;
    ativo: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
    ativo: boolean;
    id_pessoa: number;
}, {
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
    ativo: boolean;
    id_pessoa: number;
}>;
export type ListarPessoaDTO = z.infer<typeof ListarPessoaSchema>;
export declare const AlterarPessoaSchema: z.ZodObject<{
    id_pessoa: z.ZodNumber;
    nome: z.ZodOptional<z.ZodString>;
    cpf: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    telefone: z.ZodOptional<z.ZodString>;
    id_cargo: z.ZodOptional<z.ZodNumber>;
    ativo: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id_pessoa: number;
    email?: string | undefined;
    nome?: string | undefined;
    cpf?: string | undefined;
    telefone?: string | undefined;
    id_cargo?: number | undefined;
    ativo?: boolean | undefined;
}, {
    id_pessoa: number;
    email?: string | undefined;
    nome?: string | undefined;
    cpf?: string | undefined;
    telefone?: string | undefined;
    id_cargo?: number | undefined;
    ativo?: boolean | undefined;
}>;
export type AlterarPessoaDTO = z.infer<typeof AlterarPessoaSchema>;
export declare const ListarPessoaViewSchema: z.ZodObject<{
    id_pessoa: z.ZodNumber;
    id_conta: z.ZodNumber;
    id_cargo: z.ZodNumber;
    nome: z.ZodString;
    cpf: z.ZodString;
    email: z.ZodString;
    telefone: z.ZodString;
    cargo: z.ZodString;
    ativo: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
    ativo: boolean;
    id_pessoa: number;
    id_conta: number;
    cargo: string;
}, {
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
    ativo: boolean;
    id_pessoa: number;
    id_conta: number;
    cargo: string;
}>;
export type ListarPessoaViewDTO = z.infer<typeof ListarPessoaViewSchema>;
