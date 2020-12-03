const router = require("express").Router();

const Image = require("./imageModel.js");

// GET all Admin
router.get("/", (req, res) => {
  Image.findAllImage()
    .then((image) => {
      res.status(200).json(image);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "problem retrieving images" });
    });
});
