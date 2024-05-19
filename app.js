const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const College = require('./models/colleges'); // Ensure this path is correct
const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware & Static Files
app.use(morgan('dev'));
app.use(express.static( 'public'));
app.use(express.urlencoded({extended:true}));

// MongoDB connection
const dbURI = "mongodb+srv://eamcet:eamcet123@eamcet.wlkxbvq.mongodb.net/eamcet_colleges?retryWrites=true&w=majority&appName=eamcet";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection established');
        app.listen(3001, () => {
            console.log("Server is running on port 3001");
        });
    })
    .catch((err) => {
        console.error(err);
    });


app.post('/colleges',(req,res)=>
{
    const {rank,category,gender}=req.body;
    console.log(rank);
    console.log(category);
    console.log(gender);
    const score=category+"_"+gender+"S"
    College.find({ [score]: { $gt: parseInt(rank) }},{inst_name:1,inst_code:1,_id:0,[score]:1,branch_code:1} )
        .then(colleges => {
            res.render('display', { colleges: colleges, score:score });
            console.log(colleges)
        })
    });

app.get('/details', (req, res) => {
    res.render('index');
})
