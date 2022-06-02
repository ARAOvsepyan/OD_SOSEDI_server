const ApiError = require('../error/ApiError');
const { News } = require('../models/models')

class NewsController {
    async get(req, res) {
        const news = await News.findAndCountAll()
        return res.json(news)
    }

    async create(req, res, next) {
        if (!req.body) return next(ApiError.forbidden())
        try {
            const {
                title, 
                text,
                img,
                url
            } = req.body

            await News.create({title, text, img, url})

            return res.status(201).json('Created') // news
        } catch (error) {
             return next(ApiError.badRequest(error))
        }
    }

    async update(req, res, next) {
        if (!req.body || !req.params) return next(ApiError.forbidden())
        try {
            const {id} = req.params

            await News.update(req.body, {where: {id: id}})
            
            return res.status(200).json('OK') // news
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async delete(req, res, next) {
        if (!req.params) return next(ApiError.forbidden())
        try {
            const {id} = req.params

            await News.destroy({where: {id: id}})
            
            return res.status(204).json('No Content')
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }
    
}

module.exports = new NewsController()