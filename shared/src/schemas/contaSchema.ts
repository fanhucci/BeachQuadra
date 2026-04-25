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
// import {z} from "zod";

// export const ContaBaseSchema = z.object({
  
// });

// export const NovaContaSchema = ContaBaseSchema.extend({
//   id_pessoa: z.coerce.number(),
//   senha: z
//   .string()
//   .min(6, "Senha deve ter pelo menos 6 caracteres"),
// });

// export const EditarContaSchema = ContaBaseSchema.extend({
//   id_conta: z.coerce.number(),
//   senha: z
//   .string()
//   .optional()
//   .transform((val) => val === "" ? undefined : val)
//   .refine((val) => !val || val.length >= 6, {
//     message: "Senha deve ter pelo menos 6 caracteres",
//   })
// });

// export const listarContaSchema = ContaBaseSchema.extend({
//     id_conta: z.coerce.number(),
//     ativo:z.boolean()
// })

// export const ContaQuerySchema = z.object({
//   search: z.string().optional(),
//   cargo: z.coerce.number().min(1).max(3).optional(),
//   status: z
//     .string()
//     .optional()
//     .transform((val) => {
//         if (val === undefined) return undefined;
//         if (val === "true") return true;
//         if (val === "false") return false;
//         return undefined;
//     }),
// })

// export type ContaDTO = z.infer<typeof listarContaSchema>;
// export type NovaContaDTO = z.infer<typeof NovaContaSchema>;
// export type EditarContaDTO = z.infer<typeof EditarContaSchema>;
// export type ContaQueryDTO = z.infer<typeof ContaQuerySchema>;