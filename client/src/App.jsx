import React, {useState} from 'react'
import axios from "axios"

const App = () => {
    const [name, setname] = useState()
    const handleChange = (e) => {
        setname(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault() 
        try {
          const data = JSON.stringify(name)
          await axios.post("http://localhost/backend/controllers/DBConnect.php", data)
        } catch (err) {
          console.log(err)
        }
    }
    //comment
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