import { z } from "zod";
export declare const UsuarioBaseSchema: z.ZodObject<{
    usuario: z.ZodString;
    cargo: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    usuario: string;
    cargo: number;
}, {
    usuario: string;
    cargo: number;
}>;
export declare const NovoUsuarioSchema: z.ZodObject<{
    usuario: z.ZodString;
    cargo: z.ZodNumber;
} & {
    senha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    usuario: string;
    cargo: number;
    senha: string;
}, {
    usuario: string;
    cargo: number;
    senha: string;
}>;
export declare const EditarUsuarioSchema: z.ZodObject<{
    usuario: z.ZodString;
    cargo: z.ZodNumber;
} & {
    id_usuario: z.ZodNumber;
    senha: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    usuario: string;
    cargo: number;
    id_usuario: number;
    senha?: string | undefined;
}, {
    usuario: string;
    cargo: number;
    id_usuario: number;
    senha?: string | undefined;
}>;
export declare const listarUsuarioSchema: z.ZodObject<{
    usuario: z.ZodString;
    cargo: z.ZodNumber;
} & {
    id_usuario: z.ZodNumber;
    ativo: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    usuario: string;
    ativo: boolean;
    cargo: number;
    id_usuario: number;
}, {
    usuario: string;
    ativo: boolean;
    cargo: number;
    id_usuario: number;
}>;
export declare const UsuarioQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    cargo: z.ZodOptional<z.ZodNumber>;
    status: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: boolean | undefined;
    cargo?: number | undefined;
}, {
    search?: string | undefined;
    status?: string | undefined;
    cargo?: number | undefined;
}>;
export type UsuarioDTO = z.infer<typeof listarUsuarioSchema>;
export type NovoUsuarioDTO = z.infer<typeof NovoUsuarioSchema>;
export type EditarUsuarioDTO = z.infer<typeof EditarUsuarioSchema>;
export type UsuarioQueryDTO = z.infer<typeof UsuarioQuerySchema>;
