import {z} from "zod";

export const QuadraSchema = z.object({
    id_quadra:z.coerce.number(),
    nome:z.string(),
    tipo:z.string(),
    status:z.string(),
    valor:z.coerce.number()
});
export type QuadraDTO = z.infer<typeof QuadraSchema>;

export const NovaQuadraSchema = QuadraSchema.omit({
    id_quadra:true
});
export type NovaQuadraDTO = z.infer<typeof NovaQuadraSchema>;

export const EditarQuadraSchema = QuadraSchema.required({
    id_quadra:true
});
export type EditarQuadraDTO = z.infer<typeof EditarQuadraSchema>;