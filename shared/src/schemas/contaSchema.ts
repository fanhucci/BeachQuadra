import {z} from "zod";

export const CriarContaSchema = z.object({
  id_pessoa:z.coerce.number(),
  senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")
}) 
export type CriarContaDTO = z.infer<typeof CriarContaSchema>

//provavelmente vai ser apagado
export const AlterarStatusContaSchema = z.object({
  id_conta:z.coerce.number(),
})
export type AlterarStatusContaDTO = z.infer<typeof AlterarStatusContaSchema>




export const LoginSchema = z.object({
  email:z.string().email("Email inválido"),
  senha:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")
})
export type LoginDTO = z.infer<typeof LoginSchema>;

export const EsqueciSenhaSchema = z.object({
  email:z.string().email("E-mail inválido"),
})
export type EsqueciSenhaDTO = z.infer<typeof EsqueciSenhaSchema>



export const ForcarRedefinirSenhaSchema = z.object({
  id_conta:z.coerce.number(),
})
export type ForcarRedefinirSenhaDTO = z.infer<typeof ForcarRedefinirSenhaSchema>



export const AlterarSenhaSchema = z.object({
  senhaAtual:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. "),
  senhaNova:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. "),
})
export type AlterarSenhaDTO = z.infer<typeof AlterarSenhaSchema>


export const ResetarSenhaSchema = z.object({
  token: z.string(),
  senha: z.string().min(6),
  senhaConfirmar: z.string().min(6),
})
.refine(data => data.senha === data.senhaConfirmar, {
  message: "Senhas não coincidem",
  path: ["senhaConfirmar"],
});
export type ResetarSenhaDTO = z.infer<typeof ResetarSenhaSchema>
