var express = require('express');
var router = express.Router();
var Association = require('../models/Association');

// Get all Associations
router.get("/", function (req, res, next) {
    Association.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Association by ID
router.get('/:id', function(req, res, next) {
    Association.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Association 
router.post('/', async function(req,res,next){
    const AssociationObject = JSON.parse(JSON.stringify(req.body))
    const association = new Association({
        ...AssociationObject
    }); 

      association.save()
      .then(() => res.send(req.body))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Association
router.put('/:id', async function (req, res, next) {

    Association.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Association  
router.delete('/:id',function(req, res, next) {
    Association.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Association with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
