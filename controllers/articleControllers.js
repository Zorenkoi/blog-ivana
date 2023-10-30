import Article from '../models/Article.js'

export const createArticle = async (req, res) => {
  try {
    const articleObj = {
      title: req.body.title,
      description: req.body.description,
      arrElementsJson: req.body.arrElementsJson,
      authorName: req.userName,
      authorId: req.userId,
      arrImgFileNames: req.body.arrImgFileNames,
    }

    const articleItem = new Article(articleObj)

    const article = await articleItem.save()

    res.status(200).json({
      success: true,
      ...article._doc,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'ошибка при создании статьи',
    })
  }
}

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()

    res.status(200).json({
      success: true,
      articles,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'ошибка при получении статей',
    })
  }
}

export const getOneArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    res.status(200).json({
      success: true,
      article,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'ошибка при получении статьи',
    })
  }
}

export const updateArticle = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const update = { ...req.body }
    const params = { new: true }
    const updatedArticle = await Article.findOneAndUpdate(
      filter,
      update,
      params
    )

    if (!updatedArticle) {
      return res.status(400).json({
        success: true,
        message: 'статья не найдена',
      })
    }

    res.status(200).json({
      success: true,
      updatedArticle,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'ошибка при обновлении статьи',
    })
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const deletedArticle = await Article.findOneAndDelete(filter)

    res.status(200).json({
      success: true,
      deletedArticle,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'ошибка при удалении статьи',
    })
  }
}
