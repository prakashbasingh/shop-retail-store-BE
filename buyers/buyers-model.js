const db = require("../data/seeds/db-config.js");

module.exports = {
  addBuyer,
  findBuyer,
  findBuyerById,
  findOrder,
  addOrder,
  findBy,
};

function findBy(filter) {
  return db("buyer").where(filter);
}

function addBuyer(buyer) {
  return db("buyer")
    .insert(buyer, "id")
    .then((ids) => {
      return findBuyerById(ids[0]);
    });
}

function findBuyer() {
  return db("buyer");
}

function findBuyerById(id) {
  return db("buyer").where({ id }).first();
}

function addOrder(order) {
  return db("order")
    .insert(order, "id")
    .then((ids) => {
      return findOrder(ids[0]);
    });
}

function findOrder(buyerId) {
  return db("buyer as B")
    .join("order as O", "O.buyerId", "=", "B.id")
    .select(
      "O.id",
      "B.contactName",
      "B.email",
      "B.organizationName",
      "B.contactPhone",
      "O.contactName",
      "O.contactPhone",
      "O.organizationWebsite",
      "O.soapBarNum",
      "O.address",
      "O.address",
      "O.country",
      "O.beneficiariesNum",
      "O.hygieneSituation",
      "O.hygieneInitiative",
      "O.comments"
    )
    .where("B.id", buyerId)
    .orderBy("O.id");
}
