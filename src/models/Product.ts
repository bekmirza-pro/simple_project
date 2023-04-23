import { string } from 'joi'
import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IProduct extends Document {
    _id: string
    name: string
    cost: string
    product_number: number
    images: string[]
    description: string
    created_at: Date
}

const ProductSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String
    },
    cost: {
        type: String
    },
    product_number:{
        type: Number,
        default:1
    },
    images: [
        {
            type: String
        }
    ],
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IProduct>('Product', ProductSchema)
