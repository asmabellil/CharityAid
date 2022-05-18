var express = require('express');
var router = express.Router();
var Caisse = require('../models/Caisse');

// Get all Caisses
router.get("/", function (req, res, next) {
    Caisse.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Caisse by ID
router.get('/:id', function(req, res, next) {
    Caisse.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Caisse 
router.post('/', async function(req,res,next){
    const caisseObject = JSON.parse(JSON.stringify(req.body))
    const caisse = new Caisse({
        ...caisseObject
    }); 

      caisse.save()
      .then(() => res.send(req.body))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Caisse
router.put('/:id', async function (req, res, next) {

    Caisse.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.send(req.body))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Caisse  
router.delete('/:id',function(req, res, next) {
    Caisse.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Caisse with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
