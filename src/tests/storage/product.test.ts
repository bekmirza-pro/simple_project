import { IProduct } from '../../models/Product'
import { ProductStorage } from '../../storage/mongo/product'
import Database from '../../core/db'

const storage = new ProductStorage()

beforeAll(async () => {
    const db = new Database()
    db.connect()
})

describe('Checking storage.product', () => {
    const product = {
        _id: '932d599e-42ce-424f-9d1a-6bf3e809a059',
        name: 'Iphone',
        cost:'1000$',
        product_number: 2,
        images: ['images/images-74c2d488-5e35-4f70-8035-02ab77564708.png'],
        description: 'ideal' 
    }

    const fake_id = '8bf5fc5c-0558-408c-a12f-95dca952a56'

    test('Create new product: succes', () => {
        return storage.create(product as IProduct).then((data) => {
            expect(data._id).toEqual(product._id)
        })
    })

    test('Get all product: success', () => {
        return storage.find({}).then((data) => {
            expect(data.length > 0).toBeTruthy()
        })
    })

    test('Get one product: success', () => {
        return storage.findOne({ _id: product._id }).then((data) => {
            expect(data._id).toEqual(product._id)
        })
    })

    test('Get one product: fail', () => {
        return storage.findOne({ _id: fake_id }).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get update product: success', () => {
        const name = 'Name updated'
        return storage.update(product._id, { name } as IProduct).then((data) => {
            expect(data._id).toEqual(product._id)
        })
    })

    test('Get update product: fail', () => {
        const name = 'Name not updated'
        return storage.update(fake_id, { name } as IProduct).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get delete product: succes', () => {
        return storage.delete(product._id).then((data) => {
            expect(data._id).toEqual(product._id)
        })
    })

    test('Get delete product: fail', () => {
        return storage.delete(fake_id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
