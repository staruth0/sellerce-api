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
      const faq = await FAQ.findOne({ id: id });
      
      const uid = faq._id;

      const deletedfaq = await FAQ.findByIdAndDelete(uid);

      deletedfaq
        ? res.status(200).json({
          message: 'success',
          deletedfaq,
        })
        : res.status(404).send(`couldnt find any question of id ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating FAQ");
    }
  },

  updateFAQ: async (req, res) => {
    try {
      const id = req.params.id;
      const faq = await FAQ.findOne({ id: id })
      
      const uid = faq._id;

      const updatedFAQ = await FAQ.findByIdAndUpdate(uid, req.body, {
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
