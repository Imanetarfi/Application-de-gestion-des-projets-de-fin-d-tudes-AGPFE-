import React, {useState} from 'react'
import axios from "axios"

const App = () => {
    const [name, setname] = useState()
    const handleChange = (e) => {
        setname(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault() 
        
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id='name' name='name' onChange={handleChange}></input>
        <button type='submit'>Send</button>
    </form>
    </>
  )
}

export default App