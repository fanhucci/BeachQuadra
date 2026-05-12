import { z, type ZodError } from "zod";

export function formatarErrosZod<T>(error: ZodError) {
    const { fieldErrors } = z.flattenError(error);
  
    return Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => {
            const mensagens = value as string[] | undefined;
            return [key, mensagens?.[0]];
        })
    )as Partial<Record<keyof T, string>>;
}