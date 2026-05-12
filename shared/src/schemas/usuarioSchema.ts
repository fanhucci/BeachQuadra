import {z} from 'zod';

export const NovoUsuarioSchema = z.object({
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres"),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/),
    id_cargo: z.coerce.number().default(1),
    senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")  
})

export const UsuarioSchema = NovoUsuarioSchema.extend({
    id:z.coerce.number().int()
})

export const EditarUsuarioSchema = NovoUsuarioSchema.partial().extend({
    id:z.coerce.number().int()
})

export type Usuario = z.infer<typeof UsuarioSchema>;
export type NovoUsuario = z.infer<typeof NovoUsuarioSchema>;
export type EditarUsuario = z.infer<typeof EditarUsuarioSchema>;

export const CadastrarUsuarioSchema = z.object({
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres"),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/),
    id_cargo: z.coerce.number().default(1),
    senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")  
})

export type CadastrarUsuarioDTO = z.infer<typeof CadastrarUsuarioSchema>
