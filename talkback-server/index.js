// this file is also named as app.js
const Joi = require('joi');

const express = require('express');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://talkback-server:'+ process.env.MONGO_ATLAS_PW +'@talkback-server-hrc7w.mongodb.net/test?retryWrites=true');

const User = require('./models/user');

const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
    {id:4,name:'course4'}
];

// const users =[
//     {id:1,email:'prashant@gmail.com',password:'prashant',name:null,username:null,mobile:null},
//     {id:2,email:'ankit@gmail.com',password:'ankit',name:null,username:null,mobile:null},
//     {id:3,email:'ravi@gmail.com',password:'ravi',name:null,username:null,mobile:null}
// ];
app.get('/',(req,res) => {
    res.json({'message':'Hello World'});
});

app.get('/api/courses',(req,res) => {
    res.send(courses);
});

app.get('/api/users/',(req,res) => {
    User.find()
    .exec()
    .then(result => {
        if(result.length === 0) return res.json({'error':1,'message':'No Record Found.','details':{}});
        return res.json({'error':0,'message':'Success','details':result})
    })
    .catch(err => {
        // console.log(err);
        res.json({'error':1,'details':err});
    });
});
app.post('/api/users/login', (req,res) => {
    const { error } = validateUser(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);
    User.find()
    .exec()
    .then(doc => {
        if(doc){
        const user = doc.find(c => c.email === req.body.email);
        if(user){
            const validUser = (user.password === req.body.password);
            if(validUser){
                res.json({'error':0,'message':'Authentication Successful','details':{'id':user.id,'email':user.email,'name':user.name,'username':user.username,'mobile':user.mobile}});
            }
            else{
                res.json({'error':1,'message':'Authentication Failed','details':{}});
            }
        }
        else{
            res.json({'error':1,'message':'User does not exist','details':{}});
    }}
    })
.catch(err => {
    // console.log(err);
    res.json({'error':1,'details':err});
});
    
    //console.log(req.body.email);
    // const user = users.find(c => c.email === req.body.email);
    // if(!user) return res.json({'error':1,'message':'User does not exist.','details':{}});
    // if(user.password !== req.body.password) return res.json({'error':1,'message':'Email or password is incorrect.','details':{}});   
    // return res.json({'error':0,'message':'Authentication successfull','details':{'email':user.email,'name':user.name,'username':user.username,'mobile':user.mobile}});
});

app.post('/api/users/signup',(req,res) => {
    User.find()
    .exec()
    .then(doc => {
        if(doc){
        const user = doc.find(c => c.email === req.body.email);
        if(user){
        res.json({'error':1,'message':'User exist','details':{}});
        }
        else{
            const newuser = new User({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        mobile:req.body.mobile
    });

    newuser.save().then(result => {
        res.json({'error':0,'message':'User successfully registered','details':newuser});
    })
    .catch(err => {
        res.json({'error':1,'details':err});
    });
        }
    }
        else{
            res.json({'error':1,"message":"No record Found",'details':{}});
        }
    })
    .catch(err => {
        res.json({'error':1,'details':err});
    });    
});

app.delete('/api/users/delete',(req, res) => {
    const id = req.body.id;
User.findOneAndRemove({_id: id})
.exec()
.then(result => {
    if(result){
    res.json({'error':0,"message":"data deleted",'details':result});
    }
    else{
        res.json({});
    }
})
.catch(err => {
    res.json({'error':1,'details':err});
});
});

app.put('/api/users/update',(req, res) => {
    const id = req.body.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id:id},{$set:updateOps})
    .exec()
    .then(result => {
        if(result){
        res.json({'error':0,'message':'Data has been updated successfully','details':result});
        }
    })
    .catch(err => {
    res.json({'error':1,'details':err});
});
});

app.get('/api/users',(req,res) => {
    res.send(users);
});

app.post('/api/courses',(req,res) => {
    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id:courses.length + 1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found.');
    res.send(course);
});

app.put('/api/courses/:id',(req,res) => {
    // Look up the course
    //If not existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found.');
    
    // Validate
    // If invalid, return 400 -bad request 

    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);
    
    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);

});

app.delete('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found.');

    const index = courses.indexOf(course);

    courses.splice(index,1);

    res.send(course);
})

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Listening on port ${port}...`))
// app.post();
// app.put();
// app.delete()

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
function validateUser(user){
    const schema = {
        email:Joi.string().email().required(),
        password:Joi.string().required()
    };
    return Joi.validate(user, schema);
}