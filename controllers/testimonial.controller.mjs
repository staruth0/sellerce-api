import httpStatus from "http-status";
import { createTestimonial,getAllTestimonials,deleteTestimonial} from "../services/testimonialService.js";

const testimonialController = {
  createTestimonial: async (req, res) => {
    try {
      const newTestimonial = await createTestimonial(req.body);
      res.status(httpStatus.CREATED).json(newTestimonial);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating testimonial");
    }
  },

  getAllTestimonials: async (req, res) => {
    try {
      const allTestimonials = await getAllTestimonials();
      res.status(httpStatus.OK).json(allTestimonials);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching all testimonials");
    }
  },

  deleteTestimonial: async (req, res) => {
    try {
      const { testimonial_id } = req.params;
      const result = await deleteTestimonial(testimonial_id);

      result
        ? res.status(httpStatus.OK).send("Successfully deleted testimonial")
        : res.status(httpStatus.NOT_FOUND).send("No testimonial found");
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error deleting testimonial");
    }
  },
};

export default testimonialController;