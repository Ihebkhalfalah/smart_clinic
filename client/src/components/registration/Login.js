import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link ,useHistory } from "react-router-dom";

import Cookie from 'js-cookie'
import { useSelector } from "react-redux";
import { selectauth,selectuserId } from "../../redux/selector";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store";

export default function  Register (){
  let historyObj = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(selectuserId());
  const auth = useSelector(selectauth());
  const [user, setuser] = useState({
  username: "",
  email: "",
  password: ""
})
const handeInput = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  setuser({ ...user, [name]: value })
}
const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = user;

  const res = await fetch("http://localhost:3001/user/signin", {

      method: "POST",
      headers: { 'Content-Type': ' application/json'}
      ,credentials: "include" ,
            
      body: JSON.stringify({email, password })
  }).then(res => {
    
    if (res.status === 200) {
 
    
        
        
          dispatch(login(Cookie.get("jwt")))
      
          return (res.json()) 
          
      }
      else if (res.status === 401) {
          window.alert("false Used Details")
          
           }
          
  }).then(res=>{
    if (res) {
      console.log(res);

      if (res.role){
      
      historyObj.push("/Seller");

    }
    else {
      historyObj.push("/");

    }
  }
    else {
setuser({
  username: "",
  email: "",
  password: ""
})}

    
  })
      

}

  return (
    <div>
      <div className="page-section">
        <div className="container">
      
          <h1 className="text-center wow fadeInUp">{auth}</h1>
         
          <form className="main-form" onSubmit={handleSubmit}>
            <div className="row mt-5 ">
          
              <div className="col-12 col-sm-12 py-2 wow fadeInRight">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address.."
                  name="email"
                  onChange={handeInput}
                  required
                />
              </div>
             
               
             
              <div
                className="col-12 col-sm-12 py-2 wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  onChange={handeInput}
                />
              </div>
              
              
       
            </div>
            <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
              Log in
            </button>
            <br />
            you would create a count ?<Link to="/register"> Signup</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

