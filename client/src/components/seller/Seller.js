import React, { useEffect, useState } from "react";
import { selectauth,selectuserId } from "../../redux/selector";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import Chat from "../chat/chat";

import "./seller.css";
import Axios from "axios";
const Seller = (room) => {
  const socket = io.connect("http://localhost:3007");

  const userId = useSelector(selectuserId());
  const [isouvrir,setisouvrir]=useState(false) 
const Accepter=()=>{
setisouvrir(true)
window.open("http://localhost:3000/ourmodel");
}
const refuser=()=>{
setisouvrir(false)
}
const [msg, setmsg] = useState("");
  const [newState, setNewState] = useState([]);
  socket.emit("join_room", "sameriheb");
  
  ////////////////////////////////getting appointments from database
  useEffect(() => {
    console.log(userId);
    const res = fetch("http://localhost:3001/message/sen", {

      method: "POST",
      headers: { 'Content-Type': ' application/json'}
      ,credentials: "include" ,
            
      body: JSON.stringify({userId:"iheb" })
  }).then((response) => {
    return (response.json())})
    .then((response)=>{
  
      if (response) {
       setmsg(response.users[0].msg[0]);

    
     setNewState(response.users)
       console.log(newState);
       
      }
    });
  }, []);


  return (
    <div>
      <h1 className="text-center p-3 m-3">
        Your <span style={{ color: "#00D9A5" }}>Appointments</span>
      </h1>

      <div className="container my-3">
        <table className="table">
          <thead style={{ backgroundColor: "#00D9A5" }}>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Patient name</th>
              <th scope="col">Number</th>
              <th scope="col">Preferred date</th>
              <th scope="col">Clock</th>
              <th scope="col">Status</th>
              <th scope="col">Accept</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>  
          <td scope="col">001</td>
          <td scope="col">samer</td>
              <td scope="col">28001456</td>
              <td scope="col">28/01/2023</td>
              <td scope="col">yes</td>
              <td scope="col">En attente</td>
              <td scope="col" onClick={Accepter}>Accepter</td>
              <td scope="col" onClick={refuser}>refuser</td>
          </tbody>
          {newState.map((item) => (
           ( isouvrir ? (
            <div>
              <Chat socket={socket} username="iheb" room="sameriheb"  msg={msg}></Chat></div>
            ): null))) }
        </table>
      
      </div>
    </div>
  );
};

export default Seller;
