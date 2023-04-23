import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { message } from '../locales/get_message'
import Product from '../models/Product'


export class ProductController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { id } = req.params
        if (id) {
            req.query = {
                product: id
            }
        }

        const products = await storage.product.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                products
            },
            message: message('product_getAll_200', lang)
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                product
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let photo
            // await storage.product.update(req.body.product, { $inc: { product_number: 1 } })

        if (req.file) {
            photo = `images/${req.file.fieldname}-${uuidv4()}`


            await sharp(req.file.buffer)
                .png()
                .toFile(path.join(__dirname, '../../uploads', `${photo}.png`))

        }
        const product = await storage.product.create({
            ...req.body,
            creator: res.locals.id,
            images: `${photo}.png`
        })

        res.status(201).json({
            success: true,
            data: {
                product
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let photo
        let product

        if (req.file) {
            const products = await Product.findById(req.params.id)

            if (`${products?.images}` !== 'undefined') {
                await unlink(path.join(__dirname, '../../uploads', `${products?.images}`))
            }

            photo = `images/${req.file.fieldname}-${uuidv4()}`

            await sharp(req.file.buffer)
                .png()
                .toFile(path.join(__dirname, '../../uploads', `${photo}.png`))

            product = await storage.product.update(req.params.id, {
                ...req.body,
                images: `${photo}.png`
            })
        } else {
            product = await storage.product.update(req.params.id, req.body)
        }

        res.status(200).json({
            success: true,
            data: {
                product
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findById(req.params.id)

        if (`${product?.images}` !== 'undefined') {
            await unlink(path.join(__dirname, '../../uploads', `${product?.images}`))
        }

        await storage.product.delete(req.params.id)
        res.status(204).json({
            success: true,
            data: null
        })
    })
}
