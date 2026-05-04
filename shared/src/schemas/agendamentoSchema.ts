import {z} from 'zod';

export const NovaReservaSchema = z.object({
    id_quadra:z.coerce.number(),
    horario:z.coerce.date()
})
export type NovaReservaDTO = z.infer<typeof NovaReservaSchema>

export const NovoAgendamentoSchema = z.object({
    id_pessoa:z.coerce.number(),
    reservas:z.array(NovaReservaSchema).min(1),
    created_by:z.coerce.number()
})
export type NovoAgendamentoDTO = z.infer<typeof NovoAgendamentoSchema>;


const statusAgendamentoEnum = z.enum([
    'pendente',
    'confirmado',
    'concluido',
    'cancelado',
])

export const AlterarAgendamentoSchema = z.object({
    id_agendamento:z.number(),
    status:statusAgendamentoEnum,
})
export type AlterarAgendamentoDTO = z.infer<typeof AlterarAgendamentoSchema>;