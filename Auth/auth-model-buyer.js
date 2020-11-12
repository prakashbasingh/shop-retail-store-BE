const db = require("../data/db-config.js");

module.exports = {
  findAllBuyer,
  addBuyer,
  findBuyerById,
};

function findAllBuyer) {
  return db("buyer");
}

function addBuyerBuyer {
  return db("buyer")
    .insert(buyer, "id")
    .then((ids) => {
      return findBuyerById(ids[0]);
    });
}
function findBuyerById(id) {
  return db("buyer").where({ id }).first();
}
