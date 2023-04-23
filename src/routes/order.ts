

import { Router } from 'express'
import { OrderController } from '../controllers/order'
import { OrderValidator } from '../validators/order'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new OrderController()
const validator = new OrderValidator()
const middleware = new Middleware()

router.route('/all').get(middleware.auth(['admin']), controller.getAll)
router.route('/create').post(middleware.auth(['user']), validator.create, controller.create)
router
    .route('/:id')
    .get(controller.get)
    .get(controller.getAll)
    .patch(middleware.auth(['admin']), validator.update, controller.update)
    .delete(middleware.auth(['admin']), controller.delete)

export default router
