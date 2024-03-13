import FAQ from "../models/faq.model.mjs";

const FAQController = {
  createFAQ: async (req, res) => {
    try {
      const faq = await FAQ.create(req.body);
      res.status(201).json(faq);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating FAQ");
    }
  },

  getAllFAQ: async (req, res) => {
    try {
      const allFAQ = await FAQ.find({});
      res.status(200).json(allFAQ);
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching FAQ");
    }
  },

  deleteFAQ: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedfaq = await FAQ.findByIdAndDelete(id);

      deletedfaq
        ? res.status(200).send("success")
        : res.status(404).send(`couldnt find any question of id ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating FAQ");
    }
  },

  updateFAQ: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedFAQ = await FAQ.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (updatedFAQ) {
        res.status(200).json(updatedFAQ);
      } else {
        res.status(404).send(`couldnt find FAQ with id : ${id}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error updating FAQ");
    }
  },
};

export default FAQController;
