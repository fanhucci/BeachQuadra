import {z} from 'zod';

const StatusCobrancaEnum = [
    'pendente',
    'confirmado',
    'cancelado',
    'vencido',
    'estorno'
] as const

export const NovaCobrancaSchema = z.object({
    id_agendamento: z.coerce.number().int(),
    id_pessoa: z.coerce.number().int(),
})

export const CobrancaSchema = NovaCobrancaSchema.extend({
    id_cobranca: z.coerce.number().int(),
    nome:z.string(),
    valor: z.coerce.number().int(),
    status: z.enum(StatusCobrancaEnum),
    data_pagamento: z.coerce.date().nullable()
})

export const EditarCobrancaSchema = CobrancaSchema.omit({
    id_pessoa:true,
    nome:true,
    id_agendamento:true,
    valor:true,
    data_pagamento:true
})

export type NovaCobranca = z.infer<typeof NovaCobrancaSchema>;
export type Cobranca = z.infer<typeof CobrancaSchema>;
export type EditarCobranca = z.infer<typeof EditarCobrancaSchema>;