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
const dbURI="mongodb+srv://eamcet:eamcet123@eamcet.wlkxbvq.mongodb.net/eamcet_colleges?retryWrites=true&w=majority&appName=eamcet"
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connection established');
        app.listen(3003, () => {
            console.log("Server is running on port 3003");
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
    College.find({ [score]: { $gt: parseInt(rank) }},{inst_name:1,inst_code:1,_id:0,[score]:1,branch_code:1,PLACE:1} ).sort({[score]:1})
        .then(colleges => {
            res.render('display', { colleges: colleges, score:score });
            // console.log(colleges)
        })
    });

app.get('/details', (req, res) => {
    res.render('index');
});
app.get('/top',(req,res)=>
{
    res.render('top');
})
app.get('/motivate',(req,res)=>
{
    res.render('motivate')
});
app.get('/congratulate',(req,res)=>
    {
        res.render('congratulate')
    });
app.get('/rankmarks',(req,res)=>
{
    res.render('rankmarks');
});
app.post('/ranks', (req, res) => {
    const { fullname, eamcetmarks, ipe } = req.body;
    console.log(fullname);
    console.log(eamcetmarks);
    console.log(ipe);
    const totalmarks=Math.ceil(((eamcetmarks/160)*75)+((ipe/600)*25));
    console.log(totalmarks);
    if (totalmarks >= 90 && totalmarks <= 100) {
        message = 'Your Rank is between 1-100';
    } else if (totalmarks >= 81 && totalmarks < 90) {
        message = 'Your Rank is between 101-1000';
    } else if (totalmarks >= 71 && totalmarks < 81) {
        message = 'Your Rank is between 1001-5000';
    } else if (totalmarks >= 61 && totalmarks < 71) {
        message = 'Your Rank is between 5001-15000';
    } else if (totalmarks >= 51 && totalmarks < 61) {
        message = 'Your Rank is between 15000-50000';
    } else if (totalmarks >= 40 && totalmarks < 51) {
        message = 'Your Rank is between 50,001-1,50,000';
    } else  {
        message = 'For SC,ST Students (Your Rank is greater than 1,50,000) Others (Not qualified (total marks are less than 40).';
    }
    console.log(message);
    res.render('rankvsmarks',{message:message});
});
    

    

