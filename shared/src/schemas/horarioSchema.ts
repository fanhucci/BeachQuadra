import {z} from "zod";

export const horarioSchema = z.object({
    id_horario:z.coerce.number(),
    dia_semana:z.string(),
    horario_abertura:z.string(),
    horario_fechamento:z.string(),
    ativo:z.boolean()
});
export type horarioDTO = z.infer<typeof horarioSchema>;

export const editarHorarioSchema = horarioSchema.omit({
    dia_semana:true
})

export type EditarHorarioDTO = z.infer<typeof editarHorarioSchema>;

export const listaEditarHorarioSchema = z.array(editarHorarioSchema);

export const NovoBloqueioSchema = z.object({
    inicio_bloqueio:z.string().datetime().transform((val)=>new Date(val)),
    fim_bloqueio:z.string().datetime().transform((val)=>new Date(val)),
    motivo:z.string()
});
export type NovoBloqueioDTO = z.infer<typeof NovoBloqueioSchema>;

export const AgendaHorarioSchema = z.object({
    data:z.string().datetime().transform((val)=>new Date(val))
})