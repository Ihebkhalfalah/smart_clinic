import React, { useState, useEffect } from "react";
import Axios from "axios";


import Cards
 from "../home/Cards";
export default function  Ourmodel (){
   


    const [data,setdata]=useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/model/getallmodel", 
  
        ).then((response) => {
          if (response) {
         console.log(response.data.users);
            setdata(response.data.users);
           
          }
        });
      },[] );
  return (
    <div>
       <div className="home-explore">
        <h3> OUR Models  </h3>
        <div className="home-doctors">
          {data.map((item, id) => (
            <Cards src={item.src} des={item.des} key={id} title={item.nom} room1="hhhhh" room2=""   />
          ))}
        </div>
      </div>
    </div>
  );
};

