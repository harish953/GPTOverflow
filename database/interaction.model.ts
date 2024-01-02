import { Schema, models, model, Document, Model } from 'mongoose'

// Define the interface for the Interaction document
export interface IInteraction extends Document {
  user: Schema.Types.ObjectId
  tags: Schema.Types.ObjectId[]
  action: string
  question: Schema.Types.ObjectId[]
  answer: Schema.Types.ObjectId[]
  createdAt: Date
}

// Define the Interaction schema
const interactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  action: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  createdAt: { type: Date, default: Date.now },
})

// Use a try-catch block to handle the model creation
let Interaction: Model<IInteraction>

try {
  // Throws an error if the model name is invalid or a model with the same name already exists
  Interaction = model<IInteraction>('Interaction', interactionSchema)
} catch (error) {
  // Provide a more informative error message
  Interaction = models.Interaction as Model<IInteraction>
  console.error('Error creating Interaction model:', error)
}

export default Interaction
