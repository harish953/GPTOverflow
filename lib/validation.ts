import * as z from 'zod'

export const QuestionsSchema = z.object({
  title: z.string().max(150).min(5, {
    message: 'title must contain  more than 5 characters',
  }),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
})

export const AnswerSchema = z.object({
  answer: z.string().min(50),
})
export const profileSchema = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  portfolioWebsite: z.string().min(10).max(50),
  location: z.string().min(3).max(50),
  bio: z.string().min(20).max(50),
})
