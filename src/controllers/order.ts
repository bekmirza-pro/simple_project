import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'
import nodemailer from 'nodemailer'
import User from '../models/User'

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       type:'OAUTH2',
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD
//     }
//   });


export class OrderController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const orders = await storage.order.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                orders
            },
            message: message('order_getAll_200', lang)
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const order = await storage.order.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                order
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // const user = await User.findById(req.locals.id)

        const order = await storage.order.create({ ...req.body, user_id: res.locals.id })
        

        res.status(201).json({
            success: true,
            data: {
                order
            }
        })

        // const message = {
        //     from: process.env.MAIL_USERNAME,
        //     to: user?.gmail,
        //     subject: 'New Order Notification',
        //     text: `Your order ${order} has been created. Thank you for your purchase!`
        //   };

        // transporter.sendMail(message, (error, info) => {
        //     if (error) {
        //       console.log(error);
        //       res.status(500).send('Error sending email');
        //     } else {
        //       console.log(`Email sent: ${info.response}`);
        //       res.send('Email sent');
        //     }
        //   });


    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // const user = await User.findById(req.params.id)

        const order = await storage.order.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                order
            }
        })

         // const message = {
        //     from: process.env.MAIL_USERNAME,
        //     to: user?.gmail,
        //     subject: 'Update Order Notification',
        //     text: `Your order ${order} has been created. Thank you for your purchase!`
        //   };

        // transporter.sendMail(message, (error, info) => {
        //     if (error) {
        //       console.log(error);
        //       res.status(500).send('Error sending email');
        //     } else {
        //       console.log(`Email sent: ${info.response}`);
        //       res.send('Email sent');
        //     }
        //   });
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            await storage.order.delete(req.params.id)
            res.status(204).json({
                success: true,
                data: null
            })
    })
}
