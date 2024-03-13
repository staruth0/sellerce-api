import express from "express";
import FAQController from '../../controllers/faq.Controller.mjs'
const FAQRouter = express.Router()


FAQRouter.post('/create/', FAQController.createFAQ);

FAQRouter.post('/create/', FAQController.getAllFAQ);

FAQRouter.delete('/delete/:id', FAQController.deleteFAQ)

FAQRouter.put('/update/:id',FAQController.updateFAQ)


export default FAQRouter;