import z from "zod";
import { tiposQuadraEnum } from "./quadraSchema";

export const OcupacaoSchema = z.object({
    id_quadra:z.coerce.number().int(),
    nome:z.string(),
    tipo: z.enum(tiposQuadraEnum),
    total_reservas:z.coerce.number().int(),
    total_cancelamentos:z.coerce.number().int(),
    total_geral:z.coerce.number().int()
})

export const OcupacaoSearchSchema = z.object({
    search: z.string().optional(),
    tipo: z.string().optional(),
    data_inicio: z.string().optional(),
    data_fim: z.string().optional(),
    page: z.coerce.number().int().default(1),
    limit: z.coerce.number().int().default(10),
})

export type Ocupacao = z.infer<typeof OcupacaoSchema>;
export type OcupacaoSearch = z.infer<typeof OcupacaoSearchSchema>;