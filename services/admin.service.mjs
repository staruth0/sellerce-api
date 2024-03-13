import Admin from "../models/admin.model.mjs";
import httpStatus from "http-status";

/**
 * Create a new admin user
 * @param {object} adminData
 * @returns {Promise<object>}
 */

const createAdmin = async (adminData) => {
  try {
    const admin = await Admin.create(adminData);
    return admin;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating admin user");
  }
};

/**
 * Delete an admin user by ID
 * @param {string} adminId
 * @returns {Promise<object>}
 */
const deleteAdmin = async (adminId) => {
  try {
    const deleteAdmin = await Admin.findOne({ admin_id: adminId });

    if (!deleteAdmin) {
      throw new Error(`Couldn't find admin with ID: ${adminId}`);
    }

    const deletedAdmin = await Admin.findByIdAndDelete(deleteAdmin._id);
    return deletedAdmin;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting admin");
  }
};

/**
 * Get all admin users
 * @returns {Promise<Array<object>>}
 */
const getAllAdmins = async () => {
  try {
    const allAdmins = await Admin.find({});
    return allAdmins;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching admins");
  }
};

/**
 * Update admin privileges by ID
 * @param {string} adminId
 * @param {Array<string>} previledges
 * @returns {Promise<object>}
 */
const updateAdminPrivileges = async (adminId, previledges) => {
  try {
    const admin = await Admin.findOne({ admin_id: adminId });

    if (!admin) {
      throw new Error("Admin not found");
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      admin._id,
      { $push: { previledges: { $each: previledges } } },
      { new: true }
    );

    return updatedAdmin;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating admin privileges");
  }
};

export { createAdmin, deleteAdmin, getAllAdmins, updateAdminPrivileges };
