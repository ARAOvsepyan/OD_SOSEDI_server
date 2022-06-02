const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')
// const checkRole = require('../middleware/checkMiddleware')

router.get('/', newsController.get)
router.post('/', newsController.create)
router.put('/:id', newsController.update)
router.delete('/:id', newsController.delete)


module.exports = router