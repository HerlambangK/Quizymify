import { z } from "zod";

export const quizCreationSchema = z.object({
    topic: z
        .string()
        .min(4, {
            message: "Topic must be at leact 4 character long",
        })
        .max(50, {
            message: "Topic must be at most 50 characters long",
        }),
    type: z.enum(["mcq", "open_ended"]),
    amount: z.number().min(1).max(10),
});

