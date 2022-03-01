const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const disapp = express()
const app = express()
const cors = require('cors')
const Sequelize = require('sequelize');

const connection = new Sequelize("mydb","sgroot","4U$uY9DjE79n1rQH", {
    dialect: "mysql",
    host: "SG-mydb-5759-mysql-master.servers.mongodirector.com",
});

disapp.disable("x-powered-by")

const Table = connection.define('car', {
    carId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    carModel: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    carNo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    carStatus: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

connection.sync({force:true}).then((result) => {
    console.log("Table Created..")
}).then(table => {
    console.log(table)
}).catch((err) => {
    console.log(err);
});

app.use(cors(
    {
        origin: "trustedwebsite.com",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(3001,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    return Table.findAll().then(result => {
        res.json(result)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
}

app.post('/addcar',(req,res)=>{
    return Table.create({
        carId:req.body.carId,
        carModel:req.body.carModel,
        carNo:req.body.carNo,
        carStatus:req.body.carStatus
    }).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.post('/editcar',(req,res)=>{
    return Table.update({
        carModel:req.body.carModel,
        carNo:req.body.carNo,
        carStatus:req.body.carStatus
    },{where:{carId:"12212"}}).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.get('/deletecar',(req,res)=>{
    return Table.destroy({where:{carId:"12212"}}).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.get('/getcar',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        return Table.findOne("12212").then(result => {
            display(req,res)
        }).catch(err => {
            res.json({response: "Database Issue"})
        })
    }
    else
    {
        return Table.findAll().then(result => {
            display(req,res)
        }).catch(err => {
            res.json({response: "Database Issue"})
        })
    }
    
})
