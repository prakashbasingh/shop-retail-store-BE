exports.up = function (knex) {
  return knex.schema
    .createTable("administrator", function (adminTable) {
      adminTable.increments();
      adminTable.string("email", 256).notNullable().unique();
      adminTable.string("password").notNullable();
    })

    .createTable("buyer", (usersTable) => {
      usersTable.increments();
      usersTable.string("firstName", 256).notNullable();
      usersTable.string("middleInitial", 1);
      usersTable.string("lastName", 256).notNullable().index();
      usersTable.string("email", 256).notNullable().unique();
      usersTable.string("password", 256).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("buyer")
    .dropTableIfExists("administrator");
};
