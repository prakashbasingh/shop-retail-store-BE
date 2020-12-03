const db = require("../data/db-config.js");

module.exports = {
  findAllImage,
};

function findAllImage() {
  return db("image");
}
