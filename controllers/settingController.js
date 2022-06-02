const ApiError = require('../error/ApiError');
const { Settings } = require('../models/models')

class SettingController {
    async get(req, res) {
        const news = await Settings.findAll()
        return res.status(200).json(news)
    }

    async update(req, res, next) {
        if (!req.body || !req.params) return next(ApiError.forbidden())
        try {
            const {id} = req.params

            await Settings.update(req.body, {where: {id: id}})
            
            return res.status(200).json('OK')
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }
   
}

module.exports = new SettingController()