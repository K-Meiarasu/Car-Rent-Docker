const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: 
})
try
{
    var sql = "SHOW TABLES LIKE 'car'";
    connection.query(sql, function (err, result) {
        if(result.length === 0)
        {
            var sql = "CREATE TABLE car (carId VARCHAR(255), carModel VARCHAR(255),  carNo VARCHAR(255),  status VARCHAR(255),  PRIMARY KEY (carId))";
            connection.query(sql, function (err, result) {
                console.log("Table created successfully");
            });
        }
        else{
            console.log("Table already exists !")
        }
    });
}
catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(3001,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    var sql = "SELECT * from car"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
           res.json(result)
        }
        console.log(result)
    });
}

app.get('/home',(req,res)=>{
    display(req,res)
})

app.post('/addcar',(req,res)=>{
    var sql = "INSERT INTO car (carId, carModel, carNo, status) VALUES ("+"'"+ req.body.carId+"'" +", "+"'"+req.body.carModel+"'"+", "+"'"+req.body.carNo+"'"+", "+"'"+req.body.status+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.post('/editcar',(req,res)=>{
    var sql = " UPDATE car SET carModel="+"'"+req.body.carModel+"'"+","+"carNo="+"'"+req.body.carNo+"'"+","+" status="+"'"+req.body.status+"'"+" WHERE carId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/deletecar',(req,res)=>{
    var sql = "DELETE FROM car"+" WHERE carId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/getcar',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        var sql = "SELECT * from car WHERE carId=12212"
    }
    else
    {
        var sql = "SELECT * from car"
    }
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
        console.log(result)
    });
})
