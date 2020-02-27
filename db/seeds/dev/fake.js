exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { username: "matt", email: "matt@faker.com", password: "test" },
        { username: "chris", email: "chris@faker.com", password: "test" },
        { username: "hannah", email: "hannah@faker.com", password: "test" }
      ]);
    });
};
