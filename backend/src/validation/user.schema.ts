import { z } from "zod";

const userValidation = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Namn kan inte vara tomt")
        .max(20, "Namn kan inte ha mer än 20 bokstäver" ),

    email: z
        .email(),
    
    password: z
        .string()
        .trim()
        .min(8, "Lösenord måste ha minst 8 tecken")
});

export default userValidation;