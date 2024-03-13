import express from "express";
import testimonialController from "../../controllers/testimonial.controller.mjs";
const testimonialRouter = express.Router();

testimonialRouter.post("/create/", testimonialController.createTestimonial);

testimonialRouter.get("/fetchall/", testimonialController.getAllTestimonial);

testimonialRouter.delete("delete/:id", testimonialController.deleteTestimonial);

export default testimonialRouter;
