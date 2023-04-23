import { IAdmin } from '../../models/Admin'
import { AdminStorage } from '../../storage/mongo/admin'
import Database from '../../core/db'

const storage = new AdminStorage()

beforeAll(async () => {
    const db = new Database()
    await db.connect()
})

describe('Checking storage.admin', () => {
    const admin = {
        _id: 'bd348e45-8ffe-40fa-a591-782eb84e1469',
        name: {
            first_name: 'Mark',
            last_name: 'Smith'
        },
        phone_number: 998943434,
        password: '123das',
        type: 'admin',
        photo: 'images/photo-9ba11367-f046-4a11-a83e-f08187c6a094.png'
    }

    
    const fake_id = 'dace8ae9-bb96-4738-b44a-fe4b485c8dbd'

    test('Create new admin: succes', () => {
        return storage.create(admin as IAdmin).then((data) => {
            expect(data._id).toEqual(admin._id)
        })
    })

    test('Get all admin: success', () => {
        return storage.find({}).then((data) => {
            expect(data.length > 0).toBeTruthy()
        })
    })

    test('Get one admin: success', () => {
        return storage.findOne({ _id: admin._id }).then((data) => {
            expect(data._id).toEqual(admin._id)
        })
    })

    test('Get one admin: fail', () => {
        return storage.findOne({ _id: fake_id }).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get update admin: success', () => {
        const first_name = 'first_name updated'
        const last_name = 'last_name updated'

        return storage
            .update(admin._id, {
                name: {
                    first_name: first_name,
                    last_name: last_name
                }
            } as IAdmin)
            .then((data) => {
                expect(data._id).toEqual(admin._id)
            })
    })

    test('Get update admin: fail', () => {
        const first_name = 'first_name not updated'
        const last_name = 'last_name not updated'

        return storage
            .update(fake_id, {
                name: {
                    first_name: first_name,
                    last_name: last_name
                }
            } as IAdmin)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('Get delete admin: succes', () => {
        return storage.delete(admin._id).then((data) => {
            expect(data._id).toEqual(admin._id)
        })
    })

    test('Get delete admin: fail', () => {
        return storage.delete(fake_id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
