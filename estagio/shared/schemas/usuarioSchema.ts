import {z} from "zod";

export const UsuarioSchema = z.object({
    id:z.coerce.number(),
    usuario:z.string().min(1),
    senha:z.string().min(1),
    cargo:z.coerce.number().int().min(1).max(3)
});
export type UsuarioDTO = z.infer<typeof UsuarioSchema>;

export const NovoUsuarioSchema = UsuarioSchema
    .omit(
        {id:true}
    );
export type NovoUsuarioDTO = z.infer<typeof NovoUsuarioSchema>;


export const EditarUsuarioSchema = UsuarioSchema
    .required(
        {id:true}
    );
export type EditarUsuarioDTO = z.infer<typeof EditarUsuarioSchema>;