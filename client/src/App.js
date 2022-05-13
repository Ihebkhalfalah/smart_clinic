import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Seller from "./components/seller/Seller";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/registration/Register";
import Footer from "./components/footer/Footer";
import Login from "./components/registration/Login";
import AA from "./components/chat/app";
import Form from "./components/registration/Form";
import Ourmodel from "./components/ourmodel/ourmodel";
import "./styles/image.css"
import Profile from "./components/profile/profile";
import Modelpredict from "./components/registration/covidmodel.js/modelpredict";
function App() {
  const [logged, setLogged] = useState(false);
  const [userSignupInformation, setUserSignupInformation] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [userLoginInformation, setUserLoginInformation] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  return (
    <Router>
      <Navbar setLogged={setLogged} logged={logged} />
      <Switch>
        <Route exact path="/">
          
     
          <Home logged={logged} />
        </Route>
        <Route exact path="/Profile">
          
     
          <Profile/>
        </Route>
        <Route exact path="/chat">
          
     
          <AA />
        </Route>
        <Route exact path="/seller">
          <Seller />
        </Route>
        <Route exact path="/ourmodel">
          <Ourmodel />
        </Route>
        <Route exact path="/predictcovid">
          
        <div className="row my-5 py-4">
              <div className="col-sm-1"></div>
              <div className="col-sm-8">

              <Modelpredict />

              </div>
              <div className="col-sm-1"></div>
              <div className="col-sm-5 image">
              </div>
            </div>
       
        </Route>
        <Route exact path="/register">
          <Register
            userSignupInformation={userSignupInformation}
            setUserSignupInformation={setUserSignupInformation}
          />
        </Route>
        <Route exact path="/predict">
       
        <div className="row my-5 py-4">
              <div className="col-sm-2"></div>
              <div className="col-sm-4">

                <Form />

              </div>
              <div className="col-sm-1"></div>
              <div className="col-sm-5 image">
              </div>
            </div>
          </Route>
        <Route exact path="/login">
          <Login
            userLoginInformation={userLoginInformation}
            setUserLoginInformation={setUserLoginInformation}
            setLogged={setLogged}
            logged={logged}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
