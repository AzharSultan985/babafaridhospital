import IndoorMedModel from "../models/indoorMedDb.js";

const DelMedById = async (req, res) => {
  try {
    const { id } = req.params;
    //////console.log.log.log("Received ID:", id);

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const deleted = await IndoorMedModel.findOneAndDelete({ _id: id });

    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    //////console.log.log.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default DelMedById