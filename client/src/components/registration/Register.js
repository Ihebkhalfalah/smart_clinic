import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link ,useHistory } from "react-router-dom";
import Axios from "axios";


export default function  Register (){
  let historyObj = useHistory();

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
  const { username, email, password ,role} = user;
console.log(role);
  const res = await fetch("http://localhost:3001/user/signup", {

      method: "POST",
      headers: { 'Content-Type': ' application/json' },
      body: JSON.stringify({ username, email, password,role })
  }).then(res => {
      if (res.status === 201) {
          window.alert("Loggin succes")
          historyObj.push("/");
      }
      else if (res.status === 400) {
          window.alert("Already Used Details")
           }
  })
      .catch((error) => console.log("erreur"))

}

  return (
    <div>
      <div className="page-section">
        <div className="container">
          <h1 className="text-center wow fadeInUp">Register</h1>

          <form className="main-form" onSubmit={handleSubmit}>
            <div className="row mt-5 ">
              <div className="col-12 col-sm-12 py-2 wow fadeInLeft">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  name="username"
                  onChange={handeInput}
                  required
                />
              </div>
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
              
              
       
              <div
                className="col-12 col-sm-12 py-2 wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <input
                  type="password"
                  className="form-control"
                  placeholder="repeat password"
                  name="repeatPassword"
                  onChange={handeInput}
                />
              </div>
         
              <div
                className="col-12 col-sm-12 py-2 wow fadeInLeft"
                data-wow-delay="300ms"
              >
        

<select name="role" className="form-control"  id="role-select" onChange={handeInput}>
    <option className="form-control" value="">--Please choose your role--</option>
    <option className="form-control" value="Medecin">Medecin</option>
    <option className="form-control" value="Patient">Patient</option>
</select>
</div>
        
            </div>
            <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
              Submit Request
            </button>
            <br />
            Already have an account? <Link to="/login"> Signin</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

