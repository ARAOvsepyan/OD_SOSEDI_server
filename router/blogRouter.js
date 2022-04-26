const Router = require('express')
const router = new Router()
const blogController = require('../controllers/blogController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/',checkRole('ADMIN'), blogController.create)
router.post('/:title', blogController.delete)
router.get('/', blogController.getAll)
router.get('/titles', blogController.getAllTitles)
router.get('/last', blogController.getLastBlogs)

module.exports = router