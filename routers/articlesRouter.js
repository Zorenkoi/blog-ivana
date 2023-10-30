import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { handleValidationErrors } from '../utils/handleValidationErrors.js'
import { articleValidation } from '../validations/index.js'

import {
  getAllArticles,
  getOneArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from '../controllers/articleControllers.js'

const articlesRouter = Router()

articlesRouter.get('/', getAllArticles)
articlesRouter.get('/:id', getOneArticle)

articlesRouter.post(
  '/',
  articleValidation,
  handleValidationErrors,
  checkAuth,
  createArticle
)
articlesRouter.patch('/:id', checkAuth, updateArticle)
articlesRouter.delete('/:id', checkAuth, deleteArticle)

export default articlesRouter
