const Router = require('express')
const router = new Router()
const adressController = require('../controllers/adressController')
const checkRole = require('../middleware/checkMiddleware')


router.post('/',checkRole('ADMIN'), adressController.create)
router.get('/', adressController.getDesired)

module.exports = router