const Router = require('express')
const router = new Router()
const adressRouter = require('./adressRouter')
const blogRouter = require('./blogRouter')
const adminRouter = require('./adminRouter')
const messageRouter = require('./messageRouter')


router.use('/adress', adressRouter)
router.use('/blog', blogRouter)
router.use('/admin', adminRouter)
router.use('/message', messageRouter)

module.exports = router