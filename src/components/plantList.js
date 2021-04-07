import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/plants";
import * as status from "../staticData/status";
import "../css/main.css";


const PlantList = (props) => { 
    const [name, setName] = useState("");
    const [timeoutId, setTimeoutId] = useState(0);
    const [hourLimit, setHourLimit] = useState(6);
    var rec = null;

    useEffect(()=> {
    props.fetchAllPlants();
    } ,[])
    const onSubmit = (evt) => {
        evt.preventDefault();
        const plant = {
            name: name,
            status: status.NOT_WATERED,
            lastWatered: null
        }
        props.createPlant(plant, () => alert("Plant added"));
        window.location = "/";
    }
    
    const start = (record) => {
        var currentTime = new Date();
        var recordTime = new Date(record.lastWatered);
        var difference = (currentTime - recordTime) / 1000;
        if(difference > 30){
        const plant = {
            name: record.name,
            status: status.WATERING,
            lastWatered: record.lastWatered
        }
        props.updatePlant(record.id,plant,()=>console.log("Started Watering"));
        rec = record;
        var timeOutId = setTimeout(plantWatered,10000);   
        setTimeoutId(timeOutId);
    }
    else
    {
        alert("You cannot water the plant within 30 seconds");
    }
        
         
    }

    const plantWatered = () => {
        const plant = {
            name: rec.name,
            status: status.WATERED,
            lastWatered: new Date()
        }
        props.updatePlant(rec.id,plant,()=>console.log("Done Watering"));
    }

    const stop = (record) => {
    if(record.status == status.WATERING)
    {
        clearTimeout(timeoutId);
        const plant = {
            name: record.name,
            status: status.STOPPED,
            lastWatered: record.lastWatered
        }
        props.updatePlant(record.id,plant,()=>console.log("Watering Stopped"));
        window.location = "#"
    }
    else{
        alert("Plant is not in watering state right now");
    }

    }

    return (    
        <div className="container">
        <br/>

        <h3>Add Plant</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
             <input  type="text"
                required
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Plant" className="btn btn-dark" />
          </div>
        </form>

           <h3>Plants</h3>
     <table className="table">
       <thead className="thead-light">
         <tr>
           <th>Name</th>
           <th>Last Watered</th>
           <th>Hours of Last Watered</th>
           <th>Status</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
       {
        props.plantList.map((record, index)=>{
            var currentTime = new Date();
            var recordTime = new Date(record.lastWatered);
            var diff = record.lastWatered != null ? Math.abs(currentTime - recordTime) / (60*60*1000) : null;
if(diff > hourLimit)
{
         return (<tr key = {index} style = {{ 'backgroundColor': '#ff1a1a', 'color' : 'black' }}> 
         <td>{record.name}</td>
         <td>{record.lastWatered == null ? null : (new Date(record.lastWatered)).toLocaleString()}</td>
         <td>{ diff != null ? diff.toFixed(2) : null }</td>
         <td>{record.status}</td>
         <td><a href="#"  onClick={() => { start(record) }} style ={{'color' : 'black', 'fontWeight': 'bold'}} >Start</a> | 
         <a href="#" onClick={() => { stop(record) }} style ={{'color' : 'black', 'fontWeight': 'bold'}}>Stop</a></td>
         </tr>)
}
    else{
    return (<tr key = {index} style = {{ 'backgroundColor': '#DAD7D7', 'color' : 'black' }}> 
    <td>{record.name}</td>
    <td>{record.lastWatered == null ? null : (new Date(record.lastWatered)).toLocaleString()}</td>
    <td>{ diff != null ? diff.toFixed(2) : null  }</td>
    <td>{record.status}</td>
    <td><a href="#"  onClick={() => { start(record) }} style ={{'color' : 'black', 'fontWeight': 'bold'}} >Start</a> | 
    <a href="#" onClick={() => { stop(record) }} style ={{'color' : 'black', 'fontWeight': 'bold'}}>Stop</a></td>
    </tr>)
    }
   })
 }
       </tbody>
     </table>
     </div>
    )
}

const mapStateToProps = state=>{
    return{
        plantList : state.plantReducer.list
    }
}

const mapActionToProps ={
    fetchAllPlants: actions.fetchAll,
    createPlant: actions.create,
    updatePlant: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(PlantList)