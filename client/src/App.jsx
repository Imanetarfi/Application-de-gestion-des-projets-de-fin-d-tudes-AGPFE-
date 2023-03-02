import React, {useState,useEffect,useRef} from 'react'
import axios from "axios"

const App = () => {
    const [name, setname] = useState()
    const [users, setusers] = useState([])
    const loading = useRef(true)
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
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost/backend/controllers/DBConnect.php")
          setusers(response.data) 
          loading.current = false
        } catch (err) {
          console.log(err)
        }
      }
      fetchUsers();
    }, []);
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id='name' name='name' onChange={handleChange}></input>
        <button type='submit'>Send</button>
    </form>
    <div>{loading.current ? <div>Loading...</div> : users.map((user) => {
      const {id,fname,lname,password} = user
      return (
        <div key={id}>
        {fname + lname + password}
      </div>
      )
    })}</div>
    </>
  )
}

export default App