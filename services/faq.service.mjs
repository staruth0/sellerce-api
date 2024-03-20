import FAQ from "../models/faq.model.mjs";

/**
 * Create a new FAQ
 * @param {object} faqData 
 * @returns {Promise<object>}
 */
const createFAQ = async (faqData) => {
  try {
    const faq = await FAQ.create(faqData);
    return faq;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating FAQ");
  }
};

/**
 * Get all FAQs
 * @returns {Promise<Array>}
 */
const getAllFAQ = async () => {
  try {
    const allFAQ = await FAQ.find({});
    return allFAQ;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching FAQ");
  }
};

/**
 * Delete FAQ by ID
 * @param {string} id
 * @returns {Promise<object>}
 */
const deleteFAQ = async (faqId) => {
  try {
    const faqToDelete = await FAQ.findOne({ faq_id: faqId });

    if (!faqToDelete) {
      throw new Error(`Couldn't find FAQ with id: ${faqId}`);
    }

    const deletedFAQ = await FAQ.findByIdAndDelete(faqToDelete._id);

    return deletedFAQ;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting FAQ");
  }
};

/**
 * Update a FAQ by ID
 * @param {string} faqId 
 * @param {object} updatedData 
 * @returns {Promise<object>} 
 */
const updateFAQ = async (faqId, updatedData) => {
  try {
    const faqToUpdate = await FAQ.findOne({ faq_id: faqId });

    if (!faqToUpdate) {
      throw new Error(`Couldn't find FAQ with id: ${faqId}`);
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(faqToUpdate._id, updatedData, {
      new: true,
    });

    return updatedFAQ;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating FAQ");
  }
};

export { createFAQ, getAllFAQ, deleteFAQ, updateFAQ };
