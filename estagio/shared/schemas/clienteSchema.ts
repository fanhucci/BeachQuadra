import {z} from "zod";

export const ClienteSchema = z.object({
    id_cliente:z.coerce.number().nullish(),
    nome:z.string(),
    cpf:z.string(),
    telefone:z.string(),
    usuario:z.coerce.number().optional().nullable()
});
export type ClienteDTO = z.infer<typeof ClienteSchema>;


export const NovoClienteSchema = ClienteSchema.omit(
    {id_cliente:true}
);
export type NovoClienteDTO = z.infer<typeof NovoClienteSchema>;


export const EditarClienteSchema = ClienteSchema.required(
    {id_cliente:true}
)
export type EditarClienteDTO = z.infer<typeof EditarClienteSchema>;