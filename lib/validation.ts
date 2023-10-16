import React from "react";
import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().max(5).min(5, {
    message: "Username must be at least 2 characters.",
  }),
  explaination: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
