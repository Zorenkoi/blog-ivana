import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import authRouter from './routers/authRouter.js'
import articlesRouter from './routers/articlesRouter.js'
import commentsRouter from './routers/commentsRouter.js'
import imagesRouter from './routers/imagesRouter.js'

const PORT = process.env.PORT || 4444
const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(express.static('uploads'))
app.use('/auth', authRouter)
app.use('/articles', articlesRouter)
app.use('/comments', commentsRouter)
app.use('/images', imagesRouter)

app.get('/', (req, res) => {
  res.end(<h1>zalupka</h1>)
})

mongoose
  .connect('mongodb+srv://zorro:zorro@cluster0.p3lifsq.mongodb.net/blog')
  .then(() => {
    console.log('database OK')
  })
  .catch((err) => console.log('database errror', err))

app.listen(PORT, (err) => {
  if (err) {
    console.log('server error:' + err)
  } else {
    console.log('server OK')
  }
})
