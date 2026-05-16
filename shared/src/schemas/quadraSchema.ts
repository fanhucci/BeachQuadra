import {z} from "zod";

const tiposQuadraEnum = [
    "individual",
    "duplas"
] as const;


export const NovaQuadraSchema = z.object({
    nome:z.string('Nome inválido.').min(4,'Mínimo de 4 caractéres').max(30,'Máximo de 30 caractéres'),
    tipo:z.enum(tiposQuadraEnum,'Tipo inválido.'),
    status:z.coerce.boolean('Valor inváldo.'),
    valor:z.coerce.number('Valor inválido.').int('Valor inválido').min(1,"Valor mínimo: R$ 0,01").max(9999999,"Valor máximo: R$ 99.999,99")
})

export const QuadraSchema = NovaQuadraSchema.extend({
    id_quadra:z.coerce.number().int(),
    ativo:z.coerce.boolean()
})

export const EditarQuadraSchema = NovaQuadraSchema.partial().extend({
    id_quadra:z.coerce.number().int()
});

export const QuadraSearchSchema = z.object({
    search: z.string().optional(),
    tipo: z.enum(tiposQuadraEnum).optional(),
    status: z
    .string()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    })
    .optional(),
    ativo: z
    .string()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    })
    .optional()
})

export type Quadra = z.infer<typeof QuadraSchema>;
export type NovaQuadra = z.infer<typeof NovaQuadraSchema>;
export type EditarQuadra = z.infer<typeof EditarQuadraSchema>;
export type QuadraSearch = z.infer<typeof QuadraSearchSchema>;
