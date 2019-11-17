const express = require("express");
const router = express.Router();
const Exercise = require("../models/ExerciseModel");

router.get("/", (request, response) => {
  Exercise.find()
    .then(exercises => {
      console.log("Exercises retrieved");
      response.json(exercises);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(400).json({ error: error });
    });
});

router.get("/:id", (request, response) => {
  Exercise.findById(request.params.id)
    .then(exercise => {
      console.log("Exercise retrieved");
      response.json(exercise);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(400).json({ message: error });
    });
});

router.post("/add", (request, response) => {
  console.log("add exercise");
  const exercise = new Exercise({
    username: request.body.username,
    description: request.body.description,
    duration: Number(request.body.duration),
    date: Date.parse(request.body.date)
  });

  exercise
    .save()
    .then(() => {
      console.log("New exercise added to database");
      response.json(exercise);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(400).json({ message: error });
    });
});

router.delete("/delete/:id", (request, response) => {
  Exercise.findByIdAndDelete(request.params.id)
    .then(() => {
      console.log(`${request.params.id} has been deleted`);
      response.json({ message: `${request.params.id} has been deleted` });
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ message: error });
    });
});

router.post("/update/:id", (request, response) => {
  Exercise.findById(request.params.id).then(exercise => {
    exercise.username = request.body.username;
    exercise.description = request.body.description;
    exercise.duration = Number(request.body.duration);
    exercise.date = Date.parse(request.body.date);

    exercise
      .save()
      .then(() => {
        console.log(`${request.params.id} has been updated`);
        response.json(exercise);
      })
      .catch(error => {
        console.log("Error: ", error);
        response.json({ message: error });
      });
  });
});

module.exports = router;
