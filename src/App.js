import React, { useState } from 'react';
import './App.css'
import {  GoogleGenerativeAI } from '@google/generative-ai';

const App = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [day, setDay] = useState('');
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState(null);
  const [error, setError] = useState('');
  const handleClick=()=>{
    if(state.trim()!=='' && city.trim()!=='' && !isNaN(day)){
      setLoading(true);
      getResponse();
    }else{
      alert('Please fill all the fields');
    }
  }
  const getResponse = async ()=>{
    try{
      const genAI = new GoogleGenerativeAI('AIzaSyALjqjfk2RRs4m5hwD726BoNWWQJTEHwwA')
      const model = await genAI.getGenerativeModel({ model: 'gemini-pro' })
      const prompt = `Make a trip plan for following details:
                      State: ${state}
                      City: ${city}
                      Number of Days: ${day}`
      const result = await model.generateContent(prompt);
      setLoading(false);
      setData(result.response);
      }catch(e){
        setError('OOPS! SOMETHING WENT WRONG, PLEASE TRY AGAIN');
      }
  }
  return (
    <div className='container'>
      <h1>AI Trip Planner</h1>
      <div>
        <input type='text' placeholder='Enter State or Country' value={state}onChange={(e)=>setState(e.target.value)}/>
        <input type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)}/>
        <input type='number' placeholder='Enter number of days' value={day} onChange={(e)=>setDay(e.target.value)}/>
        <div className='button'>
        <button onClick={handleClick}>Generate my trip</button>
        </div>
      </div>
      <div className='response'>
        {loading?<img src={require('./assets/loading.svg').default} alt="My Icon" />:( data!==null ? (<p>{data.candidates[0]?.content?.parts[0]?.text.replaceAll("*", " ")}{error}</p>):(''))}
      </div>
    </div>
  );
}

export default App;
