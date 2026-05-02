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
    inicio:z.string(),
    fim:z.date(),
    motivo:z.string()
});
export type NovoBloqueioDTO = z.infer<typeof NovoBloqueioSchema>;