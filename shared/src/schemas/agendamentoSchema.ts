import {z} from 'zod';

const statusAgendamentoEnum = [
    'pendente',
    'confirmado',
    'concluido',
    'cancelado',
] as const;

export const NovaReservaSchema = z.object({
    id_quadra:z.coerce.number(),
    horario:z.coerce.date()
});
export type NovaReserva = z.infer<typeof NovaReservaSchema>


export const NovoAgendamentoSchema = z.object({
    id_pessoa:z.coerce.number(),
    reservas:z.array(NovaReservaSchema).min(1),
    created_by:z.coerce.number()
});

export const AgendamentoSchema = NovoAgendamentoSchema.extend({
    id_agendamento:z.coerce.number().int(),
    status:z.enum(statusAgendamentoEnum),
    valor_total:z.coerce.number().int(),
    nome:z.string()

}).omit({reservas:true})

export const EditarAgendamentoSchema = z.object({
    id_agendamento:z.number(),
    status:z.enum(statusAgendamentoEnum),
});

export const AgendamentoSearchSchema = z.object({
    search:z.string().optional(),
    status:z.enum(statusAgendamentoEnum).optional(),
    periodo:z.string().optional()
});

export type Agendamento = z.infer<typeof AgendamentoSchema>;
export type NovoAgendamento = z.infer<typeof NovoAgendamentoSchema>;
export type EditarAgendamento = z.infer<typeof EditarAgendamentoSchema>;
export type AgendamentoSearch = z.infer<typeof AgendamentoSearchSchema>;