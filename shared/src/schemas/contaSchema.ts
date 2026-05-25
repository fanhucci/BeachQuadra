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

export const EsqueciSenhaSchema = LoginSchema.omit({
  senha:true
})
export type EsqueciSenhaDTO = z.infer<typeof EsqueciSenhaSchema>


export const ForcarRedefinirSenhaSchema = z.object({
  id_pessoa:z.coerce.number(),
})
export type ForcarRedefinirSenhaDTO = z.infer<typeof ForcarRedefinirSenhaSchema>


//apagar
export const AlterarSenhaSchema = z.object({
  senhaAtual:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. "),
  senhaNova:z.string().min(6, "Senha deve ter pelo menos 6 caracteres. "),
})
export type AlterarSenhaDTO = z.infer<typeof AlterarSenhaSchema>

const AlterarSenhaBaseSchema = z.object({
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
  senhaConfirmar: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
})

export const ResetarSenhaSchema = AlterarSenhaBaseSchema.extend({
  token: z.string(),
})
.refine(data => data.senha === data.senhaConfirmar, {
  message: "Senhas não coincidem",
  path: ["senhaConfirmar"],
});

export const AlterarSenhaPerfilSchema = AlterarSenhaBaseSchema
.refine(data => data.senha === data.senhaConfirmar, {
  message: "Senhas não coincidem",
  path: ["senhaConfirmar"],
});

export type ResetarSenhaDTO = z.infer<typeof ResetarSenhaSchema>
export type AlterarSenhaPerfil = z.infer<typeof AlterarSenhaPerfilSchema>;