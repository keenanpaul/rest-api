const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.get("/", (request, response) => {
  User.find()
    .then(users => {
      response.json(users);
    })
    .catch(error => {
      response.status(400).json({ message: error });
    });
});

router.get("/:id", (request, response) => {
  User.findById(request.params.id)
    .then(user => {
      console.log("User retrieved");
      response.json(user);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(400).json({ message: error });
    });
});

router.post("/add", (request, response) => {
  const user = new User({
    username: request.body.username
  });

  user
    .save()
    .then(() => {
      console.log("New User added to database");
      response.json(user);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(400).json({ message: error });
    });
});

router.post("/update/:id", (request, response) => {
  User.findById(request.params.id)
    .then(user => {
      user.username = request.body.username;
      user
        .save()
        .then(() => {
          console.log("User updated");
          response.json(user);
        })
        .catch(error => {
          console.log("Error: ", error);
          response.status(400).json({ message: error });
        });
    })
    .catch(error => {
      console.log("Error: ", error);
    });
});

router.delete("/delete/:id", (request, response) => {
  User.findByIdAndDelete(request.params.id)
    .then(() => {
      console.log(`${request.params.id} has been deleted`);
      response.json({ message: `${request.params.id} has been deleted` });
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(400).json({ message: error });
    });
});

module.exports = router;
