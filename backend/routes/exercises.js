const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  const newExercise = new Exercise({username, description, duration, date});

  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    const id = req.params.id;
    Exercise.findById(id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    const id = req.params.id;
    Exercise.findByIdAndDelete(id)
    .then(exercise => {
        if(!exercise){
            return res.status(404).send({"message":"note not found"});
        }
        res.status(200).json({"message":"Exercise deleted."})
    })
    .catch(err => res.status(400).json('Error: ' + err));
});  

/* router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  }); */
  
router.route('/update/:id').put((req, res) => {
    const id = req.params.id;
    Exercise.findById(id)
    .then(exercise => {
        if(!exercise) {
            res.status(404).send({
                message: "Note not found with id " + id
            });
        }
        exercise.username = req.body.username,
        exercise.description = req.body.description,
        exercise.duration = Number(req.body.duration),
        exercise.date = req.body.date
        
        exercise.save();
        res.send(exercise);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                 
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
});

module.exports = router;