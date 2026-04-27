import {z} from "zod";

export const CriarContaSchema = z.object({
  id_pessoa:z.coerce.number(),
  senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")
}) 
export type CriarContaDTO = z.infer<typeof CriarContaSchema>

export const ListarContaSchema = z.object({
  id_conta:z.coerce.number(),
  id_pessoa:z.coerce.number(),
  ativo:z.boolean()
})
export type ListarContaDTO = z.infer<typeof ListarContaSchema>

export const AlterarSenhaSchema = z.object({
  id_conta:z.coerce.number(),
  senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. "),
})
export type AlterarSenhaDTO = z.infer<typeof AlterarSenhaSchema>

export const RedefinirSenhaSchema = z.object({
  id_conta:z.coerce.number(),
})
export type RedefinirSenhaDTO = z.infer<typeof RedefinirSenhaSchema>

export const AlterarStatusContaSchema = z.object({
  id_conta:z.coerce.number(),
})
export type AlterarStatusContaDTO = z.infer<typeof AlterarStatusContaSchema>


export const LoginSchema = z.object({
  email:z.string().email("Email inválido"),
  senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")
})
export type LoginDTO = z.infer<typeof LoginSchema>;
