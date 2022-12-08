
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [// Getting this Data from this courses Object - GET 
    {id: 1, name:'course 1'},
    {id: 2, name:'course 2'},
    {id: 3, name:'course 3'},
];

app.get('/',(req, res) =>{
res.send("Hello World");
});


app.get('/api/courses',(req,res) =>{
res.send(courses)
});


// // Rout parameters for values, Query string parameters for sortings etc can be used in browser
// app.get('/api/post/:year/:month',(req,res) =>{
//     res.send(req.query)// reading query || params are store at an object with key value pairs
// })


app.post('/api/courses', (req,res)=>{ // Creating Data from index
//    const schema = { ##REMOVED THIS VALIDATING ERROR FOR CLEANER CODE 
//     name: Joi.string().min(3).required() // string and is required

//    };


//    const result = Joi.validate(req.body, schema);
//     //schema defines the shape of our object, properties, type, email,string ? , char number ? 
//     if(result.error){ //input validation
//         res.status(400).send(result.error.details[0].message)
//         return;
//     }
const { error } = validateCourse(req.body);// We called the function generated at the bottom, this is called object destructure
if(error){ //input validation
  res.status(400).send(error.details[0].message)
  return;
}

    const course = {
    id:courses.length + 1,
    name: req.body.name
};
courses.push(course);
res.send(course) // return course send 
});


app.put('/api/courses/:id',(req,res) =>{ // Put is editing the record
//Pesudo-Code of the Approach
    /*look up the course
if doesnt exist , return 404

validate == good 
if invalid == return 400 - Bad request 
if validated == Update the Value 
return the Updated Value */


const course= courses.find(c => c.id === parseInt(req.params.id))// finds a course to meet the given criteria
  if(!course) return res.status(404).send('Course with given ID was not Found') // if not found, return 404


  
//   const result = validateCourse(req.body); soo we dont need this anymore
  const { error } = validateCourse(req.body);// use this for cleaner code, no DRY
  if(error){ //input validation
    res.status(400).send(error.details[0].message)
    return;
//   if(result.error){ //input validation
//     res.status(400).send(result.error.details[0].message)
//     return;
}

course.name = req.body.name;
res.send(course);


});



app.delete('/api/courses/:id', (req,res) =>{
//Find the ID 
// if doesnt Exit return 404 
const course= courses.find(c => c.id === parseInt(req.params.id))// finds a course to meet the given criteria
  if(!course) return res.status(404).send('Course with given ID was not Found') // if not found, return 404


//else Delete 
const index = courses.indexOf(course);
courses.splice(index,1)

//return respone to client
res.send(course)




});





app.get('/api/courses/:id',(req,res) =>{
  const course= courses.find(c => c.id === parseInt(req.params.id))// finds a course to meet the given criteria
  if(!course) return res.status(404).send('Course with given ID was not Found') // if not found, return 404
    res.send(course);
});
//Port 
const port = process.env.PORT || 3000; 
app.listen(port, ()=>console.log(`listening on port ${port}`))

function validateCourse(course){
    
  const schema = {// Validate - return 400 error
    name: Joi.string().min(3).required() // string and is required

   };
   return Joi.validate(course, schema);
}

