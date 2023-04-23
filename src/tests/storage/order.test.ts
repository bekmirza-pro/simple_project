import { IOrder } from '../../models/Order'
import { OrderStorage } from '../../storage/mongo/order'
import Database from '../../core/db'

const storage = new OrderStorage()

beforeAll(async () => {
    const db = new Database()
    await db.connect()
})

describe('Checking storage.order', () => {
    const order = {
        _id: 'dd093a41-7a93-4437-b3a4-b9b04bfb69c4',
        user_id: '80728950-4bb3-4ec6-83b6-bc6d7efed01e',
        product_id: '932d599e-42ce-424f-9d1a-6bf3e809a059',
        madeAt: 1681793540182
    }

    const fake_id = '8bf5fc5c-0558-408c-a12f-95dca952a56'

    test('Create new order: succes', () => {
        return storage.create(order as IOrder).then((data) => {
            expect(data._id).toEqual(order._id)
        })
    })

    test('Get all order: success', () => {
        return storage.find({}).then((data) => {
            expect(data.length > 0).toBeTruthy()
        })
    })

    test('Get one order: success', () => {
        return storage.findOne({ _id: order._id }).then((data) => {
            expect(data._id).toEqual(order._id)
        })
    })

    test('Get one order: fail', () => {
        return storage.findOne({ _id: fake_id }).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get update order: success', () => {
        const product_id = 'product_id updated'
        return storage.update(order._id, { product_id } as IOrder).then((data) => {
            expect(data._id).toEqual(order._id)
        })
    })

    test('Get update order: fail', () => {
        const product_id = 'product_id not updated'
        return storage.update(fake_id, { product_id } as IOrder).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get delete order: succes', () => {
        return storage.delete(order._id).then((data) => {
            expect(data._id).toEqual(order._id)
        })
    })

    test('Get delete order: fail', () => {
        return storage.delete(fake_id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
