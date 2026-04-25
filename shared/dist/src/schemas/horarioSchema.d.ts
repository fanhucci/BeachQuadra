import { z } from "zod";
export declare const horarioSchema: z.ZodObject<{
    id_horario: z.ZodNumber;
    dia_semana: z.ZodString;
    horario_abertura: z.ZodString;
    horario_fechamento: z.ZodString;
    ativo: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id_horario: number;
    dia_semana: string;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}, {
    id_horario: number;
    dia_semana: string;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}>;
export type horarioDTO = z.infer<typeof horarioSchema>;
export declare const editarHorarioSchema: z.ZodObject<Omit<{
    id_horario: z.ZodNumber;
    dia_semana: z.ZodString;
    horario_abertura: z.ZodString;
    horario_fechamento: z.ZodString;
    ativo: z.ZodBoolean;
}, "dia_semana">, "strip", z.ZodTypeAny, {
    id_horario: number;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}, {
    id_horario: number;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}>;
export type EditarHorarioDTO = z.infer<typeof editarHorarioSchema>;
export declare const listaEditarHorarioSchema: z.ZodArray<z.ZodObject<Omit<{
    id_horario: z.ZodNumber;
    dia_semana: z.ZodString;
    horario_abertura: z.ZodString;
    horario_fechamento: z.ZodString;
    ativo: z.ZodBoolean;
}, "dia_semana">, "strip", z.ZodTypeAny, {
    id_horario: number;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}, {
    id_horario: number;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}>, "many">;
