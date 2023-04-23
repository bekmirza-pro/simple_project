import { IUser } from '../../models/User'
import { UserStorage } from '../../storage/mongo/user'
import Database from '../../core/db'

const storage = new UserStorage()

beforeAll(async () => {
    const db = new Database()
    db.connect()
})

describe('Checking storage.user', () => {
    const user = {
        _id: '80728950-4bb3-4ec6-83b6-bc6d7efed01e',
        name: {
            first_name: 'Jhon',
            last_name: 'Doe'
        },
        phone_number: 9989415547,
        password: '123abc',
        type: 'user',
        photo: 'images/photo-7f4b7d5f-15c1-46a3-8e24-aa7aa1ccd66c.png'
    }

    const fake_id = '8bf5fc5c-0558-408c-a12f-95dca952a56'

    test('Create new user: succes', () => {
        return storage.create(user as IUser).then((data) => {
            expect(data._id).toEqual(user._id)
        })
    })

    test('Get all user: success', () => {
        return storage.find({}).then((data) => {
            expect(data.length > 0).toBeTruthy()
        })
    })

    test('Get one user: success', () => {
        return storage.findOne({ _id: user._id }).then((data) => {
            expect(data._id).toEqual(user._id)
        })
    })

    test('Get one user: fail', () => {
        return storage.findOne({ _id: fake_id }).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get update user: success', () => {
        const name = {
            first_name: 'Jhon',
            last_name: 'Doe'
        }

        return storage.update(user._id, { name } as IUser).then((data) => {
            expect(data._id).toEqual(user._id)
        })
    })

    test('Get update user: fail', () => {
        const name = {
            first_name: 'Jhon',
            last_name: 'Doe'
        }
        return storage.update(fake_id, { name } as IUser).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get delete user: succes', () => {
        return storage.delete(user._id).then((data) => {
            expect(data._id).toEqual(user._id)
        })
    })

    test('Get delete user: fail', () => {
        return storage.delete(fake_id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
