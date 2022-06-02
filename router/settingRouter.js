const Router = require('express')
const router = new Router()
const settingController = require('../controllers/settingController')

router.get('/', settingController.get)
router.put('/:id', settingController.update)

module.exports = router