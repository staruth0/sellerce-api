import express from "express";
import adminController from '../../controllers/admin.controller.mjs'
const adminRouter = express.Router()


adminRouter.post('/', adminController);

adminRouter.delete('/:id', adminController)



export default adminRouter;