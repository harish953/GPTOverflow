// import Answer from '@/database/answer.model'
'use server'
import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { ViewQuestionParams } from './shared'

import Interaction from '@/database/interaction.model'

export async function ViewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase()
    const { userId, questionId } = params
    console.log('view')
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true }
    )

    if (userId) {
      const existingInteraction = await Interaction.findOneAndUpdate({
        user: userId,
        question: questionId,
        action: 'view',
      })
      if (existingInteraction) {
        return console.log('user has viewed Question')
      }
      await Interaction.create({
        user: userId,
        question: questionId,
        action: 'view',
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
