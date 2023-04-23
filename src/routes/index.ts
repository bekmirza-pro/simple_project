import express, { Router } from 'express'
import path from 'path'
import adminRouter from './admin'
import orderRouter from './order'
import productRouter from './product'
import userRouter from './user'

const router = Router({ mergeParams: true })

router.use('/api/file', express.static(path.join(__dirname, '../../../uploads')))
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)

export default router
