const router = require("express").Router();


const Users = require("./users-model");
const restricted = require("../auth/authenticate-middleware");


router.get("/",  (req, res) => {
  Users.find()
    .then(users => {
      console.log(users);
      res.json(users);
    })
    .catch(err => res.send(err));
});


module.exports = router;