import { z } from "zod";
export declare const QuadraSchema: z.ZodObject<{
    id_quadra: z.ZodNumber;
    nome: z.ZodString;
    tipo: z.ZodString;
    status: z.ZodString;
    valor: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: string;
    nome: string;
    id_quadra: number;
    tipo: string;
    valor: number;
}, {
    status: string;
    nome: string;
    id_quadra: number;
    tipo: string;
    valor: number;
}>;
export type QuadraDTO = z.infer<typeof QuadraSchema>;
export declare const NovaQuadraSchema: z.ZodObject<Omit<{
    id_quadra: z.ZodNumber;
    nome: z.ZodString;
    tipo: z.ZodString;
    status: z.ZodString;
    valor: z.ZodNumber;
}, "id_quadra">, "strip", z.ZodTypeAny, {
    status: string;
    nome: string;
    tipo: string;
    valor: number;
}, {
    status: string;
    nome: string;
    tipo: string;
    valor: number;
}>;
export type NovaQuadraDTO = z.infer<typeof NovaQuadraSchema>;
export declare const EditarQuadraSchema: z.ZodObject<{
    status: z.ZodString;
    nome: z.ZodString;
    id_quadra: z.ZodNumber;
    tipo: z.ZodString;
    valor: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: string;
    nome: string;
    id_quadra: number;
    tipo: string;
    valor: number;
}, {
    status: string;
    nome: string;
    id_quadra: number;
    tipo: string;
    valor: number;
}>;
export type EditarQuadraDTO = z.infer<typeof EditarQuadraSchema>;
