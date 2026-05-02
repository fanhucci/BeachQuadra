import {z} from 'zod';

export const NovaReservaSchema = z.object({
    id_quadra:z.number(),
    horario:z.date()
})
export type NovaReservaDTO = z.infer<typeof NovaReservaSchema>

export const NovoAgendamentoSchema = z.object({
    id_pessoa:z.number(),
    reservas:z.array(NovaReservaSchema).min(1),
    created_by:z.number()
})
export type NovoAgendamentoDTO = z.infer<typeof NovoAgendamentoSchema>;


const statusAgendamentoEnum = z.enum([
    'pendente',
    'confirmado',
    'cancelado',
    'concluido'
])

export const AlterarAgendamentoSchema = z.object({
    id_agendamento:z.number(),
    status:statusAgendamentoEnum,
})
export type AlterarAgendamentoDTO = z.infer<typeof AlterarAgendamentoSchema>;