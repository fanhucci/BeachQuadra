import {z} from "zod";

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