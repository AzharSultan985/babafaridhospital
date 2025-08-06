import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // Your logic to handle the POST request
  res.send("Indoor medicine data received");
});

export default router;
