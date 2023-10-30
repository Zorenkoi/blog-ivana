import { Router } from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import fs2 from 'fs'

const imagesRouter = Router()

const __dirname = dirname(fileURLToPath(import.meta.url))
const uploadDir = path.join(__dirname, '..', 'uploads')
await fs.mkdir(uploadDir, { recursive: true })

imagesRouter.post('/', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Файлы для загрузки не были выбраны.')
  }

  let uploadedFiles = req.files.images

  try {
    if (!Array.isArray(uploadedFiles)) {
      uploadedFiles = [uploadedFiles]
    }

    for (const uploadedFile of uploadedFiles) {
      await uploadedFile.mv(path.join(uploadDir, uploadedFile.name))
    }

    res.send('Файлы успешно загружены.')
  } catch (err) {
    console.error(err)
    res.status(500).send('Произошла ошибка при загрузке файлов.')
  }
})

imagesRouter.delete('/', (req, res) => {
  const fileName = req.query.fileName

  if (!fileName) {
    return res.status(400).json({ message: 'Имя файла не указано' })
  }

  const imagePath = `${uploadDir}/${fileName}`

  if (fs2.existsSync(imagePath)) {
    fs2.unlinkSync(imagePath)
    res.json({ message: 'Изображение успешно удалено' })
  } else {
    res.status(404).json({ message: 'Изображение не найдено' })
  }
})

export default imagesRouter
