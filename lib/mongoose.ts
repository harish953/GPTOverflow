import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
  if (!process.env.MONGO_URL) {
    console.error('Missing MongoDB URL')
    return
  }

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'gptoverflow',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any)

    isConnected = true

    console.log('Mongoose is connected')
  } catch (error) {
    console.error('Mongoose connection failed', error)
    // Handle the error appropriately for your application (e.g., throw, exit process, log to a centralized system)
  }
}
