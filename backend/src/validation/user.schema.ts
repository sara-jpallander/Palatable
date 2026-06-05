import { z } from "zod";

const userValidation = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name cannot be empty")
        .max(20, "Name cannot exceed 20 characters"),

    email: z
        .email("Invalid email"),
    
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
});

export default userValidation;