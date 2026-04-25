import { z } from "zod";
export declare const QuadraBaseSchema: z.ZodObject<{
    nome: z.ZodString;
    tipo: z.ZodString;
    status: z.ZodBoolean;
    valor: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: boolean;
    nome: string;
    tipo: string;
    valor: number;
}, {
    status: boolean;
    nome: string;
    tipo: string;
    valor: number;
}>;
export declare const ListarQuadraSchema: z.ZodObject<{
    nome: z.ZodString;
    tipo: z.ZodString;
    status: z.ZodBoolean;
    valor: z.ZodNumber;
} & {
    id_quadra: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: boolean;
    nome: string;
    tipo: string;
    valor: number;
    id_quadra: number;
}, {
    status: boolean;
    nome: string;
    tipo: string;
    valor: number;
    id_quadra: number;
}>;
export declare const QuadraQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    tipo: z.ZodOptional<z.ZodString>;
    status: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean | undefined, string | undefined>;
    ativo: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    status?: boolean | undefined;
    tipo?: string | undefined;
    ativo?: boolean | undefined;
}, {
    search?: string | undefined;
    status?: string | undefined;
    tipo?: string | undefined;
    ativo?: string | undefined;
}>;
export type AdicionarQuadraDTO = z.infer<typeof QuadraBaseSchema>;
export type QuadraDTO = z.infer<typeof ListarQuadraSchema>;
export type QuadraQueryDTO = z.infer<typeof QuadraQuerySchema>;
