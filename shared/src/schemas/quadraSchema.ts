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
    .optional()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    }),
    ativo: z
    .string()
    .optional()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    })
})

export type Quadra = z.infer<typeof QuadraSchema>;
export type NovaQuadra = z.infer<typeof NovaQuadraSchema>;
export type EditarQuadra = z.infer<typeof EditarQuadraSchema>;
export type QuadraSearch = z.infer<typeof QuadraSearchSchema>;


export const QuadraBaseSchema = z.object({
    nome:z
        .string()
        .min(2,"Nome deve ter pelo menos 2 caracteres"),
    tipo:z
        .string(),
    status:z
        .boolean(),
    valor:z
        .coerce
        .number()
        .positive("Valor precisa ser positivo")
        .min(1,"Valor precisa ser maior que 0")
        .max(9999999,"Valor maximo atingido")
});

export const ListarQuadraSchema = QuadraBaseSchema.extend({
    id_quadra:z.coerce.number().int()
})

export const QuadraQuerySchema = z.object({
    search: z.string().optional(),
    tipo: z.string().optional(),
    status: z
    .string()
    .optional()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    }),
    ativo: z
    .string()
    .optional()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    })
})

export type AdicionarQuadraDTO = z.infer<typeof QuadraBaseSchema>;
export type QuadraDTO = z.infer<typeof ListarQuadraSchema>;
export type QuadraQueryDTO = z.infer<typeof QuadraQuerySchema>;