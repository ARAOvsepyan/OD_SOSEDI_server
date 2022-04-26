const {Message} = require('../models/models')
const ApiError = require('../error/ApiError');

class MesaageController {
    // Отправка сообщения
    async create(req, res, next) {
        const {firs_name, last_name, email, telephone, message_info, isRead} = req.body
        if (!message_info && (!email || !telephone)) {
            return next(ApiError.badRequest('Некорректно заполнена форма'))
        }
        const message = await Message.create({firs_name, last_name, email, telephone, message_info, isRead})

        return res.json(message)
    }

    // Изменить статус сообщения на прочитанный
    async isread(req, res) {
        const {id} = req.body
  
        await Message.update(
            {
                isRead: true
            }, 
            {
                where: 
                {
                    id: id
                }
            })

        return res.json()
    }

    // Получение всех сообщений
    async get(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit

        let message = await Message.findAndCountAll({limit, offset})
        
        return res.json(message)       
    }

    // Получение не прочитанных сообщений
    async get_no_read(req, res) {
        let message = await Message.findAll({where: {isRead: false}})

        return res.json(message)
    }
}

module.exports = new MesaageController()