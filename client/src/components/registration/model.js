import React from 'react'
import Axios from "axios";
const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/predict", { name: [1, 50, 80, 33, 70, 30, 0.55, 20] } 
     
    ).then((response) => {
     console.log(response.data.predict)
  })};
export default function model() {
  return (
    <div><form onSubmit={handleSubmit} method="post">
    <input type="text" name="experience" placeholder="Experience" required="required" />
    <input type="text" name="test_score" placeholder="Test Score" required="required" />
    <input type="text" name="interview_score" placeholder="Interview Score" required="required" />
    <input type="text" name="experience2" placeholder="Experience" required="required" />
    <input type="text" name="test_score2" placeholder="Test Score" required="required" />
    <input type="text" name="interview_score2" placeholder="Interview Score" required="required" />
    <input type="text" name="experience3" placeholder="Experience" required="required" />
    <input type="text" name="test_score3" placeholder="Test Score" required="required" />
 

    <button type="submit" class="btn btn-primary btn-block btn-large">Predict</button>
</form>
</div>
  )
  }
