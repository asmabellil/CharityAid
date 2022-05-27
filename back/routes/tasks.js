var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

// Get all Tasks
router.get("/", function (req, res, next) {
    Task.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Task by ID
router.get('/:id', function(req, res, next) {
    Task.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Task 
router.post('/', async function(req,res,next){
    const TaskObject = JSON.parse(JSON.stringify(req.body))
    const task = new Task({
        ...TaskObject
    }); 

    Task.create(task).then((d) => {
      (ids = d._id), console.log(ids);

    res.send(
      {
        _id: d._id,
        ...req.body
      }
    );      
    });
  });

// Modify Task
router.put('/:id', async function (req, res, next) {

    Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Task  
router.delete('/:id',function(req, res, next) {
    Task.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Task with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
