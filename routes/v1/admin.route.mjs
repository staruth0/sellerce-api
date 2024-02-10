import express from "express";
import adminController from '../../controllers/admin.controller.mjs'
const adminRouter = express.Router()


adminRouter.post('/', adminController.createAdmin);
adminRouter.get('/fetchAll', adminController.getAllAdmins);

adminRouter.delete('/delete/:id', adminController.deleteAdmin)
adminRouter.put('/update/:id', adminController.updateAdminPriveledge)



export default adminRouter;