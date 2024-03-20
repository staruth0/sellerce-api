import express from "express";
import adminController from '../../controllers/admin.controller.mjs'
const adminRouter = express.Router()

import {createAdminValidation, updateAdminValidation} from '../../validations/admin.validation.mjs'
import validate from '../../middlewares/validate.mjs'

adminRouter.post('/create', validate(createAdminValidation), adminController.createAdmin);
adminRouter.get('/fetchAll', adminController.getAllAdmins);

adminRouter.delete('/delete/:id', adminController.deleteAdmin)
adminRouter.put('/update/:admin_id',validate(updateAdminValidation), adminController.updateAdminPrivileges)



export default adminRouter;