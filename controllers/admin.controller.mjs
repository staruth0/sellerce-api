import Admin from "../models/admin.model.mjs";

const adminController = {
  createAdmin: async (req, res) => {
    try {
      const admin = await Admin.create(req.body);
      res.status(201).json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating admin");
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAdmin = await Admin.findByIdAndDelete(id);

      deletedAdmin
        ? res.status(200).send("success deleting admin")
        : res.status(404).send(`couldnt find admin with is id : ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("error deleting admin");
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      const allAmins = await Admin.find({});
      res.status(201).json(allAmins);
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching admins");
    }
  },

  updateAdminPriveledge: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Admin.findOne({ admin_id: id });

      if (!admin) {
        return res.status(404).send( "Admin not found");
      } else {
        admin.previledges.push(...req.body);

          const updatedAdmin = await admin.save();
          res.status(200).send('successfully updated');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error updating admin previledges");
    }
  },
};

export default adminController;
