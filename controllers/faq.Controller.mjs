import httpStatus from "http-status";
import {createFAQ,getAllFAQ,deleteFAQ,updateFAQ} from "../services/faq.service.mjs";

const faqController = {
  createFAQ: async (req, res) => {
    try {
      const faq = await createFAQ(req.body);
      res.status(httpStatus.CREATED).json(faq);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating FAQ");
    }
  },

  getAllFAQ: async (req, res) => {
    try {
      const allFAQ = await getAllFAQ();
      res.status(httpStatus.OK).json(allFAQ);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching FAQ");
    }
  },

  deleteFAQ: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedFAQ = await deleteFAQ(id);

      if (deletedFAQ) {
        res.status(httpStatus.OK).json({
          message: "Success deleting faq",
          deletedFAQ,
        });
      } else {
        res.status(httpStatus.NOT_FOUND).send(`Couldn't find any question of id ${id}`);
      }
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error deleting FAQ");
    }
  },

  updateFAQ: async (req, res) => {
    try {
      const { id } = req.params;

      const updatedFAQ = await updateFAQ(id, req.body);

      if (updatedFAQ) {
        res.status(httpStatus.OK).json(updatedFAQ);
      } else {
        res.status(httpStatus.NOT_FOUND).send(`Couldn't find FAQ with id: ${id}`);
      }
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error updating FAQ");
    }
  },
};

export default faqController;