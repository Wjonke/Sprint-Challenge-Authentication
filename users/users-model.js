const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
};

function find() {
  return db("users as u")
    .select(
      "u.id",
      "u.username",
      "u.password",
    )
}


function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

