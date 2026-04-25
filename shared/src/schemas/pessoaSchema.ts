import {z} from "zod";

export const CriarPessoaSchema = z.object({
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres"),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/),
    id_cargo: z.coerce.number().min(1,"Selecione um cargo"),  
})

export type CriarPessoaDTO = z.infer<typeof CriarPessoaSchema>

export const PessoaQuerySchema = z.object({
    search:z.string().optional(),
    tipo:z.coerce.number().min(1).max(3),
    id_cargo:z.coerce.number().optional(),
    ativo:z
    .string()
    .optional()
    .transform((val) => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
    }),
});

export type PessoaQueryDTO = z.infer<typeof PessoaQuerySchema>

export const ListarPessoaSchema = z.object({
    id_pessoa:z.coerce.number(),
    nome: z.string(),
    cpf: z.string(),
    email: z.string(),
    telefone: z.string(),
    id_cargo: z.coerce.number(),
    ativo:z.boolean()
})

export type ListarPessoaDTO = z.infer<typeof ListarPessoaSchema>

export const AlterarPessoaSchema = z.object({
    id_pessoa:z.coerce.number(),
    nome: z.string().min(4,"Nome precisa ter no minimo 4 caracteres").optional(),
    cpf: z.string().length(11,"CPF Inválido").regex(/^\d+$/).optional(),
    email: z.string().email("E-mail inválido").optional(),
    telefone: z.string().min(9,"Telefone inválido").regex(/^\d+$/).optional(),
    id_cargo: z.coerce.number().min(1,"Selecione um cargo").optional(),  
    ativo:z.boolean().optional()
})

export type AlterarPessoaDTO = z.infer<typeof AlterarPessoaSchema>


export const ListarPessoaViewSchema = z.object({
    id_pessoa:z.coerce.number(),
    id_conta:z.coerce.number(),
    id_cargo:z.coerce.number(),

    nome: z.string(),
    cpf: z.string(),
    email: z.string(),
    telefone: z.string(),

    cargo: z.string(),

    ativo:z.boolean(),
    
})

export type ListarPessoaViewDTO = z.infer<typeof ListarPessoaViewSchema>
