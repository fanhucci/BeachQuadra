import {z} from 'zod';

export const CadastrarUsuarioSchema = z.object({
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres"),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/),
    id_cargo: z.coerce.number().default(1),
    senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")  
})

export type CadastrarUsuarioDTO = z.infer<typeof CadastrarUsuarioSchema>
