
import { AdminStorage } from './mongo/admin'
import { UserStorage } from './mongo/user'
import { ProductStorage } from './mongo/product'
import { OrderStorage } from './mongo/order'

interface IStorage {
    admin: AdminStorage
    user: UserStorage
    product: ProductStorage
    order: OrderStorage
}

export let storage: IStorage = {
    admin: new AdminStorage(),
    user: new UserStorage(),
    product: new ProductStorage(),
    order: new OrderStorage()
}
