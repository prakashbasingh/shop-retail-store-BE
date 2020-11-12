exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("buyer")
      .del()
      // .truncate()
      .then(function () {
        // Inserts seed entries
        return knex("buyer").insert([
          {
            firstName: "Super",
            middleInitial: "B",
            lastName: "Man",
            email: "kathmandu@nepal.com",
            password: "nepal",
          },
          {
            firstName: "Super",
            middleInitial: "B",
            lastName: "Man",
            email: "pokhara@nepal.com",
            password: "nepal",
          },
          {
            firstName: "Super",
            middleInitial: "B",
            lastName: "Man",
            email: "birgunj@nepal.com",
            password: "nepal",
          },
          {
            firstName: "Super",
            middleInitial: "B",
            lastName: "Man",
            email: "hetauda@nepal.com",
            password: "nepal",
          },
          {
            firstName: "Super",
            middleInitial: "B",
            lastName: "Man",
            email: "kalapani@nepal.com",
            password: "nepal",
          },
        ]);
      })
  );
};
