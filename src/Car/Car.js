import React from 'react'
import axios from 'axios'

const Car = () => {

    const [db, setdb] = React.useState('')
    const newCar=JSON.stringify({
            "carId":"12212",
            "carModel":"baleno",
            "carNo":"TN 38 CJ 6636",
            "carStatus":"available"
        }, null, 2)

    const editCar=JSON.stringify({
        "carModel":"verna",
        "carNo":"TN 33 DD JJJJ",
        "carStatus":"booked"
    }, null, 2)

    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/home',
          }).then((response)=>{
             setdb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])

    function addCar(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/addcar',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                carId:"12212",
                carModel:"baleno",
                carNo:"TN 38 CJ 6636",
                carStatus:"available"
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function editCars(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/editcar?id=12212',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                "carModel":"verna",
                "carNo":"TN 33 DD JJJJ",
                "carStatus":"booked"
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function deleteCar(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/deletecar?id=12212',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getCar(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/getcar',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getCarByID(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/getcar?id=12212',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    return (
        <div>
            <div className="header">
            <h1>Car Rental Management</h1>
            </div>
            <div className="body"><br/>
                <pre>{db}</pre><br/>
                <div id='box'>
                    <h2>Add New Car</h2>
                    <p>POST - /addcar</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{newCar}</pre>
                    <button onClick={()=>{addCar()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Edit a Car Details</h2>
                    <p>POST - /editcar?id= 12212</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{editCar}</pre>
                    <button onClick={()=>{editCars()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Delete a Car</h2>
                    <p>GET - /deletecar?id=12212</p>
                    <button onClick={()=>{deleteCar()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get All Cars</h2>
                    <p>GET - /getcar</p>
                    <button onClick={()=>{getCar()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get Car By ID</h2>
                    <p>GET - /getcar?id= 12212</p>
                    <button onClick={()=>{getCarByID()}}>Send</button>
                </div><br/>
            </div>
        </div>
    )
}

export default Car;