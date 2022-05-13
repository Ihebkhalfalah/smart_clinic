import React from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../chat/chat";
import {useHistory } from "react-router-dom";
const socket = io.connect("http://localhost:3007");

const Cards = ({ src, title, des,room1,room2 }) => {





  let historyObj = useHistory();
  const ispredict = room1==="";
  const ispredictcovid = room2==="";
  const [showChat, setShowChat] = useState(false);
  const openRoom = ()=>{
    if(!ispredict && !ispredictcovid){
    socket.emit("join_room", room1+room2);
  

  
        setShowChat(true);
    }
    else if(ispredict){
      historyObj.push("/predict")
    }
    else{
      historyObj.push("/predictcovid")
    }
  }
  
  return (
    <diV>
    <div className="cars-cards">
      <div className="card" style={{ width: "20rem" }}>
        <img className="card-img-top" src={src} alt="Card one" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{des}</p>
          <Link to="#" className="btn btn-primary"  onClick={openRoom}>
           Get a predict
          </Link>
        </div>
      </div>
    </div>
    {showChat ? (
       <Chat socket={socket} username="samer" room="sameriheb" id="iheb" msg="" />
      ) : null }
    
    </diV>
  );
};

export default Cards;
