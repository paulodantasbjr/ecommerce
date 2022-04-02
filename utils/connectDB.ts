import { connect } from 'mongoose'

export const connectDB = () => {
  connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err
      console.log('MongoDB connected...')
    }
  )
}
