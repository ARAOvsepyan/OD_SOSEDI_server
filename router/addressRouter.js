const Router = require('express')
const router = new Router()
const addressController = require('../controllers/addressController')
const checkRole = require('../middleware/checkMiddleware')


router.post('/address', addressController.create_address)
router.post('/city', addressController.create_city)
router.post('/cyty_area', addressController.create_city_area)
router.post('/cyty_district', addressController.create_city_district)
router.get('/search', addressController.getDesired)

module.exports = router