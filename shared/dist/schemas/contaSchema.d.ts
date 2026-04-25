import { z } from "zod";
export declare const CriarContaSchema: z.ZodObject<{
    id_pessoa: z.ZodNumber;
    senha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id_pessoa: number;
    senha: string;
}, {
    id_pessoa: number;
    senha: string;
}>;
export type CriarContaDTO = z.infer<typeof CriarContaSchema>;
export declare const ListarContaSchema: z.ZodObject<{
    id_conta: z.ZodNumber;
    id_pessoa: z.ZodNumber;
    ativo: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    ativo: boolean;
    id_pessoa: number;
    id_conta: number;
}, {
    ativo: boolean;
    id_pessoa: number;
    id_conta: number;
}>;
export type ListarContaDTO = z.infer<typeof ListarContaSchema>;
export declare const AlterarSenhaSchema: z.ZodObject<{
    id_conta: z.ZodNumber;
    senha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id_conta: number;
    senha: string;
}, {
    id_conta: number;
    senha: string;
}>;
export type AlterarSenhaDTO = z.infer<typeof AlterarSenhaSchema>;
export declare const RedefinirSenhaSchema: z.ZodObject<{
    id_conta: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id_conta: number;
}, {
    id_conta: number;
}>;
export type RedefinirSenhaDTO = z.infer<typeof RedefinirSenhaSchema>;
export declare const AlterarStatusContaSchema: z.ZodObject<{
    id_conta: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id_conta: number;
}, {
    id_conta: number;
}>;
export type AlterarStatusContaDTO = z.infer<typeof AlterarStatusContaSchema>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    senha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    senha: string;
}, {
    email: string;
    senha: string;
}>;
export type LoginDTO = z.infer<typeof LoginSchema>;
