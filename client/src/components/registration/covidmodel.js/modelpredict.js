import React, { useState } from 'react'
import {Navbar, Nav, Button, Modal} from 'react-bootstrap';
import Axios from "axios";
import './modelpredict.css'
export default function Modelpredict() {

  const [ isOpen, setIsOpen ]= useState(false);

  const openModal = () => setIsOpen( true );
  const closeModal = () => setIsOpen( false );

  const [ patient, setPatient ] = useState({fievre: 0, fatique: 0, voyage: 0, infpoum: 0, touss: 0,rhume:0,diara:0,age:25,sex:1});
  const [ isWating , setIsWaiting ] =useState(false);
  const [ data , setdata ] =useState();
const changedatasetPatient=(e)=>{

  
if (e.target.checked){
  if(!(e.target.id==="femme")){

  
  setPatient({ ...patient, [e.target.name]:1})


}else {
  setPatient({ ...patient, [e.target.name]:0})
}
}
else {
  setPatient({ ...patient, [e.target.name]:e.target.value})
}
console.log(patient);
 }
  var predir = async(e) => {
    console.log("sending request");
    e.preventDefault();        
    setIsWaiting(true);
    console.log(patient);
    var dataToSend = { "name": [patient.age, patient.sex, patient.fievre, patient.touss, patient.rhume, patient.fatique,patient.infpoum, patient.diara, patient.voyage ]}
    console.log(patient.age);
    
//{ name: [1, 50, 80, 33, 70, 30, 0.55, 20] }
    openModal();

    await  Axios.post("http://localhost:5000/predictcovid", dataToSend )
    
          .then((donnée) => {
            /********************************** here is when there is result *******************************/
            console.log("data ",donnée.data.predict);
            setdata(donnée.data)
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
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="fievre"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Est ce que vous avez de fievre?</label>
         
      
           
   
      </div>
      <div className="form-group">
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="fatique"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Sentez-vous habituellement fatigué (mal au muslces)?</label>
         
      
           
   
      </div>
      <div className="form-group">
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="voyage"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Avez-vous voyagé?</label>
         
      
           
   
      </div>
      <div className="form-group">
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="infpoum"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Avez-vous des infections au niveau du poumon ?</label>
         
      
           
   
      </div>
      
      <div className="form-group">
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="touss"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Toussez-vous beaucoup ?</label>
         
      
           
   
      </div>
      <div className="form-group">
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="rhume"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Avez-vous le nez qui coule (rhume)?</label>
         
      
           
   
      </div>
      
      <div className="form-group">
      <input type="checkbox" 
                style={{display:"inline", width:"50"}} 
                className="form-control col-md-3 position-relative top-3 end-0" 
                id="Pregnancies" aria-describedby="nbPregnancies" 
                value="0"
                min="0" max="17" step="1" 
                name="diara"
                onChange={ (e) =>{ changedatasetPatient(e)}}
              />
      <label style={{display:"inline", width:"50"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Avez-vous le diarhea?</label>
         
      
           
   
      </div>
      <div className="form-group">
          <label htmlFor="Age" style={{display:"inline", width:"50",marginLeft:"80px"}} className="col-md-2 w-25 pr-5">patient's age &nbsp; </label>
          <input type="number" style={{display:"inline", width:"50"}} className="form-control col-md-2 position-relative top-3 end-0" id="Age" placeholder="your age" min="0" max="120" 
                    name="age"
                    onChange={ (e) =>{ changedatasetPatient(e)}}
                />
      </div>
      <div className="form-group">
      
      <label style={{display:"inline", width:"50",marginLeft:"80px"}} htmlFor="Pregnancies" className="col-md-2 w-25 pr-5" >Quelle est votre sexe?</label>
         
      
    
<input  type="radio" onChange={ (e) =>{ changedatasetPatient(e)}} name="sex"  id="flexRadioDefault1" label="Default radio" defaultChecked/>
<label   htmlFor="Age" style={{display:"inline", width:"50",marginLeft:"80px"}} className="col-md-2 w-25 pr-5" >Homme&nbsp; </label>
<input type="radio" onChange={ (e) =>{ changedatasetPatient(e)}}  id="femme" name="sex"  label="Checked radio" />

<label htmlFor="Age" style={{display:"inline", width:"50",marginLeft:"80px"}} className="col-md-2 w-25 pr-5">Femme &nbsp; </label>
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
              {data? <span> the patient <span style={{color:"blue"}}>{data.malade==1? "does have": "doesn't have"}</span> covid 19 with a probability that is <span style={{color:"blue"}}>{(data.predict)*100}</span></span>: <span>network error</span>}              
            </Modal.Body>
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

    </form>
  )
}
