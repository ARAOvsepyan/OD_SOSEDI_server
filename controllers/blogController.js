const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path')
const fs = require('fs/promises');
const {Blog} = require('../models/models')
const { fstat } = require('fs')

class BlogController {
    // Создание блога
    async create(req, res) {
        const {title, main_text,} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const blog = await Blog.create({title, main_text, img: fileName})

        return res.json(blog) // Ответ (img: fileName - название файла сохраненной фотографии)
    }

    // Удаление блока
    async delete(req, res, next) {
        const {title} = req.params

        try {
            const blog = await Blog.findAll({
                attributes: ['img'], 
                where: {title: title}
            })
    
            
            fs.unlink(path.resolve(__dirname, '..', 'static', blog[0].img))
            
            const blog_1 = await Blog.destroy({where: {title: title}})

            return res.json(blog_1)
        } catch (e) {
            return next(ApiError.internal('Такого поста не существует'))
        }      
    }

    // Получаем 3 последних поста (для главной страницы сайта)
    async getLastBlogs(req, res) {
        let blog = await Blog.findAll()
        let lastBlogId = blog.length

        let limit = 3
        let offset = lastBlogId - limit
        if (offset < 0)
            offset = 0
        let blog_1 = await Blog.findAndCountAll({limit, offset})

        return res.json(blog_1)
    }
    
    // Получаем все посты (для страницы блог)
    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit

        let blog = await Blog.findAndCountAll({limit, offset})
        
        return res.json(blog)       
    }

    // Получаем все "тайтлы" постов
    async getAllTitles (req, res) {
        const blog = await Blog.findAll({
            attributes: ['title'],
            })

        return res.json(blog)
    }
}

module.exports = new BlogController()