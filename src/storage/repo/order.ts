import { IOrder } from '../../models/Order'

export interface IOrderAllResponse {
    payloads: IOrder[]
    count: number
}

export interface OrderRepo {
    find(query: Object): Promise<IOrder[]>
    findOne(query: Object): Promise<IOrder>
    create(payload: IOrder): Promise<IOrder>
    update(id: string, payload: IOrder): Promise<IOrder>
    delete(id: string): Promise<IOrder>
}
