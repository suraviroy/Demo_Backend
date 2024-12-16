import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import adminListRouter from './routes/adminListRoute.js'

const app = express()
dotenv.config()

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use(express.json())

//creating the connect function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')
  } catch (error) {
    throw error
  }
}

//if mongoDB is disconnected, then handle the error
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB is disconnected')
})

//define middleware below
app.use('/adminListRouter', adminListRouter)


//listening port
app.listen(8080, () => {
  connect()
  console.log('Connected to backend')
})
