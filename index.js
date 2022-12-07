const express = require('express');
const app = express();

app.get('/',(req, res) =>{
res.send("Hello World");
});


app.get('/api/courses',(req,res) =>{
res.send([1,2,3,4,5,5])
});


// Rout parameters for values, Query string parameters for sortings etc can be used in browser
app.get('/api/post/:year/:month',(req,res) =>{
    res.send(req.query)// reading query || params
})

//Port 
const port = process.env.PORT || 3000; 
app.listen(port, ()=>console.log(`listening on port ${port}`))

