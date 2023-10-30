import { Router } from 'express'
import { handleValidationErrors } from '../utils/handleValidationErrors.js'
import { checkAuth } from '../utils/checkAuth.js'
import {
  registrationValidation,
  loginValidation,
} from '../validations/index.js'
import { registration, login, authMe } from '../controllers/authControllers.js'

const authRouter = Router()

authRouter.post(
  '/registration',
  registrationValidation,
  handleValidationErrors,
  registration
)

authRouter.post('/login', loginValidation, handleValidationErrors, login)
// authRouter.post('/me', checkAuth, handleValidationErrors, login)
authRouter.get('/me', checkAuth, authMe)

export default authRouter
