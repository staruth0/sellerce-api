import httpStatus from "http-status";
import { createAdmin, deleteAdmin, getAllAdmins, updateAdminPrivileges,} from "../services/adminService.js";

const adminController = {
  createAdmin: async (req, res) => {
    try {
      const admin = await createAdmin(req.body);
      res.status(httpStatus.CREATED).json(admin);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error creating admin user");
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAdmin = await deleteAdmin(id);

      res.status(httpStatus.OK).json({
        message: "Success deleting admin",
        deletedAdmin,
      });
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error deleting admin",
      });
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      const allAdmins = await getAllAdmins();
      res.status(httpStatus.OK).json(allAdmins);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching admins");
    }
  },

  updateAdminPrivileges: async (req, res) => {
    try {
      const { admin_id } = req.params;
      const { privileges } = req.body;

      const updatedAdmin = await updateAdminPrivileges(admin_id, privileges);
      res.status(httpStatus.OK).json(updatedAdmin);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error updating admin privileges");
    }
  },
};

export default adminController;