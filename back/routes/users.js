var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Member = require('../models/Member');
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var { SendResetPasswordEmail } = require("../mail/mailer");
const { appendFile } = require('fs');

// Get all Users
router.get("/", function (req, res, next) {
    User.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get User by ID
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add User 
router.post("/", async function (req, res, next) {
  const password = req.body.Password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    Username: req.body.Username,
    Password: hashedPassword,
    Email: req.body.Email,
    Role: req.body.Role
  });
  try {
    user.save();
    res.send("Ajout");
  } catch (error) {
    res.send(error);
  }
});

// Modify User
router.put('/:id', async function (req, res, next) {
  const password = req.body.Password;
  const hashedPassword = await bcrypt.hash(password, 10);
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, Password: hashedPassword})
    .then(() => res.status(200).json({ msg: 'User modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete User  
router.delete('/:id',function(req, res, next) {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `User with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})



/* Login */

router.post("/login", function (req, res, next) {
  const email = req.body.Email;
  const password = req.body.Password;

  User.find(
    { $or: [ { Email: email }] },
    async function (err, data) {
      if (err) throw err;
      if (data.length === 0) {
        console.log(data);
        return res.send("User Not Registred");
      }
    else if ((await bcrypt.compare(password, data[0].Password)) === false) {
        console.log(password);

        console.log("WrongPassword");
        return res.send("Wrong Password");
      } else {
        console.log(data[0].Role);
        
        Member.findById(data[0]._id, function (err, doc) {
                if (err) {
                  res.send(err);
                } else {
                  index = Member.find(data[0]._id).index;
                  let token = jwt.sign({email : data[0].Email}, 'secret', {expiresIn: '3h'})
                  if (data[0].Role == "member") {
                    var o2 = {
                      _id: data[0]._id,
                      Email: data[0].Email,
                      Role: data[0].Role,
                      FirstName: doc.FirstName,
                      LastName: doc.LastName,
                      Picture: doc.Picture,
                      Phone: doc.Phone,
                      DOB: doc.DOB,
                      Adress: doc.Adress,
                      Association: doc.Association,
                      Role_Association: doc.Role_Association,
                      IdAssociation: doc.IdAssociation,
                      Valid: doc.Valid,
                      token: token
                    };
                    res.send(o2); 
                  } else if (data[0].Role == "superadmin") {
                    console.log(data[0])
                    var o1 = {
                      _id: data[0]._id,
                      Email: data[0].Email,
                      Role: data[0].Role,
                      FirstName: "Admin",
                      LastName: "",
                      token: token
                    };
                    res.send(o1); 
                  }
                  
                }
        });
      }
    }
  );
});


// RESET PASSWORD

router.get('/forgot-password', (req, res, next)=>{
  res.render('forgot-password')
})

router.post('/forgot-password', (req, res, next)=>{
  const email = req.body.Email
  console.log(req.body)

User.find(
    { $or: [ { Email: email }] }, async function(err, data){
      if (err){
        throw(err)
      }else if (data.length === 0){
        res.send('User not registred')
      } 
      else {
        const secret = process.env.JWT_SECRET + data[0].Password
        const payload = {
          email: data[0].Email,
          id: data[0]._id
        }
        const token = jwt.sign(payload, secret, {expiresIn: '5min'})
        const link = `http://localhost:4200/#/reset-password/${data[0]._id}/${token}`
        
        try {
          SendResetPasswordEmail(data[0].Email, data[0].Email, data[0]._id, link)
          res.status(200).send('success') 
        } catch (error) {
          console.log("error " , error)
          res.send(error)
        }
        

      }
    })
  
})

router.get('/reset-password/:id/:token', (req, res, next)=>{
  const id = req.params.id;
  const token = req.params.token;

  User.find(
    { $or: [ { Email: email }] }, async function(err, data){
      if (err){
        throw(err)
      }else if (data.length === 0){
        res.send('User not registred')
      } 
      else {
        const secret = process.env.JWT_SECRET + data[0].Password
        try{
          const payload = jwt.verify(token,secret)
          res.render('reset-password', {email: data[0].Email})
        }catch(err){
          res.send(err)
        }
      }
    })
})

router.post('/reset-password/:id/:token', (req, res, next)=>{
  const id = req.params.id;
  const token = req.params.token;
  const password = req.body.Password;

  User.findById(req.params.id,async function(err,data){
      if (err){
        throw(err)
        console.log('ereeeer')
      }else if (data.length === 0){
        res.send('User not registred')
        console.log('User not registred')
      } 
      else {
        const secret = process.env.JWT_SECRET + data.Password
        try{
          const payload = jwt.verify(token,secret)
            const password = req.body.Password;
            const hashedPassword = await bcrypt.hash(password, 10);
              User.updateOne({ _id: data._id }, { Password: hashedPassword})
              .then(() => res.status(200).json({ msg: 'User modified' }))
              .catch(err => res.status(400).json({ error: err }))
        }catch(err){
          res.send(err)
          console.log(err)
        }
      }
    })
})



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

