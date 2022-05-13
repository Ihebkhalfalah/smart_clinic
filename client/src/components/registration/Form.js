import React, { useState } from 'react'
import {Navbar, Nav, Button, Modal} from 'react-bootstrap';
import Axios from "axios";
export default function Form() {

  const [ isOpen, setIsOpen ]= useState(false);

  const openModal = () => setIsOpen( true );
  const closeModal = () => setIsOpen( false );

  const [ patient, setPatient ] = useState({});
  const [ isWating , setIsWaiting ] =useState(false);
  const [ data , setdata ] =useState();

  var predir = async(e) => {
    console.log("sending request");
    e.preventDefault();        
    setIsWaiting(true);
    console.log(patient);
    var dataToSend = { "name": [patient.Pregnancies, patient.Glucose, patient.BloodPresure, patient.SkinThickness, patient.Insulin, patient.BMI, patient.Diabetes, patient.Age ]}
    console.log(dataToSend);
    
//{ name: [1, 50, 80, 33, 70, 30, 0.55, 20] }
    openModal();

    await  Axios.post("http://localhost:5000/predict", dataToSend )
    
          .then((donnée) => {
            /********************************** here is when there is result *******************************/
            console.log("data ",donnée.data.predict);
            setdata(donnée.data.predict)
            console.log(data);
          })
      
      .catch(
        (err) => {
          console.warn(err);
          setdata(false);
          return new Response(JSON.stringify({
              code: 400,
              message: 'network Error'
          }));
        }
      );
    setIsWaiting(false);
    console.log("end of the request");

  } 
  return (
    <form className="form">
      <div className="form-group">
          <label htmlFor="Pregnancies" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-5">Pregnancies &nbsp; &nbsp;</label>
          <input type="number" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-6 position-relative top-0 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                placeholder="how many times have you been pregnant" 
                min="0" max="17" step="1" 
                name="Pregnancies"
                onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
              />
          <small id="nbPregnancies" className="form-text text-muted"></small>
      </div>
      <div className="form-group">
          <label htmlFor="Glucose" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-5">Glucose rate &nbsp; &nbsp;</label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control col-md-6 position-relative top-0 end-0" id="Glucose" placeholder="Glucose rate" min="0" max="200" step="1"
                  name="Glucose"
                  onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                />
      </div>
      <div className="form-group">
          <label htmlFor="BloodPressure" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-3">Blood presure rate </label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control col-md-6 position-relative top-0 end-0" id="BloodPressure"  placeholder="Blood pressure rate" min="0" max="150" step="1"
                    name="BloodPresure"
                    onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                    />
      </div>
      <div className="form-group">
          <label htmlFor="SkinThickness" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-3">Skin thickness rate </label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control col-md-6 position-relative top-0 end-0" id="SkinThickness" placeholder="Skin thickness rate" min="0" max="100" step="1"
                    name="SkinThickness"
                    onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                />
      </div>
      <div className="form-group">
          <label htmlFor="Insulin" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-5">Insuline rate  &nbsp;  &nbsp;</label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control input-sm col-md-6 position-relative top-0 end-0" id="Insulin" placeholder="Insulin rate" min="0" max="900" step="1"
                    name="Insulin"
                    onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                />
      </div>
      <div className="form-group">
          <label htmlFor="BMI" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-3">Body Mass Indexe &nbsp;</label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control input-sm col-md-6 position-relative top-0 end-0" id="BMI" placeholder="BMI rate" min="0" max="80"
                    name="BMI"
                    onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                />
      </div>
      <div className="form-group">
          <label htmlFor="DiabetesPedigreeFunction" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-3">Diabetes pedigree &nbsp;</label>
          <input type="number" className="form-control input-sm col-md-6 position-relative top-0 end-0" style={{display:"inline", width:"50"}} id="DiabetesPedigreeFunction" placeholder="Diabetes pedigree function" min="0" max="3" 
                    name="Diabetes"
                    onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                />
      </div>
      <div className="form-group">
          <label htmlFor="Age" style={{display:"inline", width:"50"}} className="col-md-2 w-25 pr-5">patient's age &nbsp; </label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control col-md-6 position-relative top-0 end-0" id="Age" placeholder="your age" min="0" max="120" 
                    name="Age"
                    onChange={ (e) => setPatient({ ...patient, [e.target.name]: parseInt(e.target.value)})}
                />
      </div>
      <label className="col-md-4"></label>
      <button type="submit" style={{display:"inline", width:"50", backgroundColor: "#00D9A5"}} className="btn btn-primary col-md-4 mt-3" onClick={(e) => predir(e)}>Submit</button>

      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>AI prediction results</Modal.Title>
        </Modal.Header>
        { isWating?<span className="ml-3" style={{ color: "red"}}>
          processing...
        </span>:
            <Modal.Body>
              {data? <span> the patient <span style={{color:"blue"}}>{data==1? "does have": "doesn't have"}</span> diabetes with a probability that is <span style={{color:"blue"}}>{data ==1 ?"higher than 60%": "lower than 40%"}</span></span>: <span>network error</span>}              
            </Modal.Body>
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

    </form>
  )
}
