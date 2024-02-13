import Admin from "../models/admin.model.mjs";

const adminController = {
  createAdmin: async (req, res) => {
    try {
      const admin = await Admin.create(req.body);
      res.status(201).json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating admin user");
    }
  },

deleteAdmin: async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdmin = await Admin.findOne({ admin_id: id });

    if (deleteAdmin) {
      const idd = deleteAdmin._id;
      const deletedAdmin = await Admin.findByIdAndDelete(idd);

      deletedAdmin ? res.status(200).json({
            message: "Success deleting admin",
            deletedAdmin,
          }) : res.status(404).json({
            message: `Couldn't find admin with ID: ${id}`
          });
    } else {
      res.status(404).json({
        message: `Couldn't find admin with ID: ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting admin"
    });
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
      return res.status(404).json({
        message: "Admin not found",
      });
    } else {
      const { previledges } = req.body;
      const id = admin._id;

      const updatedAdmin = await Admin.findByIdAndUpdate( id,{ $push: { previledges: { $each: previledges } } },{new:true});
      res.status(200).json(updatedAdmin);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating admin previledges");
  }
}
};

export default adminController;
