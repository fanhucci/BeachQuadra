import { z } from "zod";
export declare const UsuarioSchema: z.ZodObject<{
    id: z.ZodNumber;
    usuario: z.ZodString;
    senha: z.ZodString;
    cargo: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    usuario: string;
    senha: string;
    cargo: number;
}, {
    id: number;
    usuario: string;
    senha: string;
    cargo: number;
}>;
export type UsuarioDTO = z.infer<typeof UsuarioSchema>;
export declare const NovoUsuarioSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    usuario: z.ZodString;
    senha: z.ZodString;
    cargo: z.ZodNumber;
}, "id">, "strip", z.ZodTypeAny, {
    usuario: string;
    senha: string;
    cargo: number;
}, {
    usuario: string;
    senha: string;
    cargo: number;
}>;
export type NovoUsuarioDTO = z.infer<typeof NovoUsuarioSchema>;
export declare const EditarUsuarioSchema: z.ZodObject<{
    id: z.ZodNumber;
    usuario: z.ZodString;
    senha: z.ZodString;
    cargo: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    usuario: string;
    senha: string;
    cargo: number;
}, {
    id: number;
    usuario: string;
    senha: string;
    cargo: number;
}>;
export type EditarUsuarioDTO = z.infer<typeof EditarUsuarioSchema>;
