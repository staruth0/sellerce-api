import Testimonial from "../models/testimonial.model.mjs";

const testimonialController = {
  createTestimonial: async (req, res) => {
    try {
      const testimonialData = await Testimonial.create(req.body);
      res.status(201).json(testimonialData);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating testimonial");
    }
  },

  getAllTestimonial: async (req, res) => {
    try {
      const alltestimonial = await Testimonial.find({});
      res.status(200).json(alltestimonial);
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching all testimonial");
    }
  },

  deleteTestimonial: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Testimonial.findByIdAndDelete(id);

      result
        ? res.status(200).send("successfully deleted")
        : res.status(404).send("no testimonial found");
    } catch (error) {
      console.error(error);
      res.status(500).send("error deleting testimonial");
    }
  },
};

export default testimonialController;
