const db = require("../data/db-config.js");

module.exports = {
  findAllAdmin,
  addAdmin,
  findAdminById,
};

function findAllAdmin() {
  return db("administrator");
}

function addAdmin(admin) {
  return db("administrator")
    .insert(admin, "id")
    .then((ids) => {
      return findAdminById(ids[0]);
    });
}
function findAdminById(id) {
  return db("administrator").where({ id }).first();
}
