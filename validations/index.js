import { body } from 'express-validator'

export const registrationValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('fullName').isLength({ min: 3 }),
  body('iconUrl').optional().isURL(),
]

export const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
]

export const articleValidation = [
  body('title').isLength({ min: 5 }),
  body('description').isLength({ min: 10 }),
  body('arrElementsJson').isLength({ min: 10 }),
]
