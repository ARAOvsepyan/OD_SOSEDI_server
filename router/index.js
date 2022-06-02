const Router = require('express')
const router = new Router()
const addressRouter = require('./addressRouter')
const newsRouter = require('./newsRouter')
const userRouter = require('./userRouter')
const settingRouter = require('./settingRouter')


router.use('/addresses', addressRouter)
router.use('/news', newsRouter)
router.use('/user', userRouter)
router.use('/setting', settingRouter)

module.exports = router