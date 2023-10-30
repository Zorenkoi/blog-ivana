import { Router } from 'express'
import Comment from '../models/Comment.js'
import Article from '../models/Article.js'
import { checkAuth } from '../utils/checkAuth.js'
const commentsRouter = Router()

commentsRouter.post('/rootcomment/:articleId', checkAuth, async (req, res) => {
  try {
    const { articleId } = req.params
    const articleFromDb = await Article.findOne({ _id: articleId })

    const rootCommentItem = new Comment({
      ...req.body,
      commentatorId: req.userId,
      commentatorName: req.userName,
    })
    await rootCommentItem.save()

    articleFromDb.arrCommentsId.push(rootCommentItem)
    await articleFromDb.save()

    res.status(200).send({ success: true })
  } catch (err) {
    console.log(err)
  }
})
commentsRouter.get('/rootcomment/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params
    const arrComments = await Comment.find({ articleId })

    res.status(200).send({ comments: arrComments })
  } catch (err) {
    console.log(err)
  }
})

commentsRouter.post('/answer/:id', checkAuth, async (req, res) => {
  try {
    const parentCommentId = req.params.id

    const commentFromDb = await Comment.findOne({ _id: parentCommentId })

    const answerItem = new Comment({
      ...req.body,
      commentatorId: req.userId,
      commentatorName: req.userName,
    })
    await answerItem.save()

    commentFromDb.answers.push(answerItem._id)
    await commentFromDb.save()

    res.status(200).send({ answer: answerItem })
  } catch (err) {
    console.log(err)
  }
})
commentsRouter.get('/answer/:id', async (req, res) => {
  try {
    const answerFromDb = await Comment.findOne({ _id: req.params.id })

    return res.status(200).send({ answer: answerFromDb })
  } catch (err) {
    console.log(err)
  }
})

commentsRouter.post('/like/:id', checkAuth, async (req, res) => {
  try {
    const commentId = req.params.id
    const userId = req.userId
    const commentFromDb = await Comment.findOne({ _id: commentId })
    const oldArrDislikes = commentFromDb.arrDislikes
    const oldArrLikes = commentFromDb.arrLikes

    commentFromDb.arrDislikes = oldArrDislikes.filter((id) => {
      return userId !== id.toString()
    })
    commentFromDb.arrLikes = oldArrLikes.filter((id) => {
      return userId !== id.toString()
    })
    commentFromDb.arrLikes.push(userId)

    await commentFromDb.save()

    res.status(200).send({ message: 'Like' })
  } catch (err) {
    console.log(err)
  }
})
commentsRouter.post('/dislike/:id', checkAuth, async (req, res) => {
  try {
    const commentId = req.params.id
    const userId = req.userId
    const commentFromDb = await Comment.findOne({ _id: commentId })
    const oldArrDislikes = commentFromDb.arrDislikes
    const oldArrLikes = commentFromDb.arrLikes

    commentFromDb.arrLikes = oldArrLikes.filter((id) => {
      return userId !== id.toString()
    })
    commentFromDb.arrDislikes = oldArrDislikes.filter((id) => {
      return userId !== id.toString()
    })
    commentFromDb.arrDislikes.push(userId)

    await commentFromDb.save()

    res.status(200).send({ message: 'Dislike' })
  } catch (err) {
    console.log(err)
  }
})
commentsRouter.post('/cancelrating/:id', checkAuth, async (req, res) => {
  try {
    const commentId = req.params.id
    const userId = req.userId
    const commentFromDb = await Comment.findOne({ _id: commentId })

    const oldArrLikes = commentFromDb.arrLikes
    commentFromDb.arrLikes = oldArrLikes.filter((id) => {
      return userId !== id.toString()
    })

    const oldArrDislikes = commentFromDb.arrDislikes
    commentFromDb.arrDislikes = oldArrDislikes.filter((id) => {
      return userId !== id.toString()
    })

    await commentFromDb.save()

    res.status(200).send({ message: 'cancel rating' })
  } catch (err) {
    console.log(err)
  }
})

export default commentsRouter
