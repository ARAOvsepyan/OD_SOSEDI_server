const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', messageController.create)
router.post('/read', messageController.isread) // надо реализовать на клиенте
router.get('/',checkRole('ADMIN'), messageController.get)
router.get('/no_read', messageController.get_no_read) // надо реализовать на клиенте

module.exports = router