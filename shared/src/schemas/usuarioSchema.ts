import {z} from 'zod';

const tiposPesquisaEnum = [
    'nome',
    'cpf',
    'email'
] as const;

export const NovoUsuarioSchema = z.object({
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres"),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/),
    id_cargo: z.coerce.number().default(1),
    senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")  
})

export const UsuarioSchema = NovoUsuarioSchema.extend({
    id_pessoa:z.coerce.number().int(),
    ativo:z.boolean()
}).omit({senha:true})

export const EditarUsuarioSchema = NovoUsuarioSchema.partial().extend({
    id_pessoa:z.coerce.number().int()
}).omit({senha:true})

export const UsuarioSearchSchema = z.object({
    search:z.string().optional(),
    tipo:z.enum(tiposPesquisaEnum),
    id_cargo:z.coerce.number().int().optional(),
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

export type Usuario = z.infer<typeof UsuarioSchema>;
export type NovoUsuario = z.infer<typeof NovoUsuarioSchema>;
export type EditarUsuario = z.infer<typeof EditarUsuarioSchema>;
export type UsuarioSearch = z.infer<typeof UsuarioSearchSchema>;

export const CadastrarUsuarioSchema = z.object({
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres"),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/),
    id_cargo: z.coerce.number().default(1),
    senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")  
})

export type CadastrarUsuarioDTO = z.infer<typeof CadastrarUsuarioSchema>
