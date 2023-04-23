import { IProduct } from '../../models/Product'

export interface IProductAllResponse {
    payloads: IProduct[]
    count: number
}

export interface ProductRepo {
    find(query: Object): Promise<IProduct[]>
    findOne(query: Object): Promise<IProduct>
    create(payload: IProduct): Promise<IProduct>
    update(id: string, payload: IProduct): Promise<IProduct>
    delete(id: string): Promise<IProduct>
}
