import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IOrder extends Document {
    _id: string
    user_id: string
    product_id: string
    madeAt: number
    created_at: Date
}

const OrderSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    user_id: {
        type: String,
        ref: 'User'
    },
    product_id: {
        type: String,
        ref: 'Product'
    },
    madeAt: {
        type: Number,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IOrder>('Order', OrderSchema)
