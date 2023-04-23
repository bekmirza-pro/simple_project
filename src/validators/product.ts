import Joi, { number } from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'


export class ProductValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    createSchema = Joi.object({
        name: Joi.string().required(),
        cost: Joi.string().required(),
        product_number:Joi.number().required(),
        images: Joi.string(),
        description: Joi.string()
    })

    updateSchema = Joi.object({
        name: Joi.string().required(),
        cost: Joi.string().required(),
        product_number:Joi.number().required(),
        images: Joi.string(),
        description: Joi.string()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const { error } = this.createSchema.validate(req.body)

        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
