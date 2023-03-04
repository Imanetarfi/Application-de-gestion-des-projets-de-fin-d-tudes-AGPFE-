import React, {useState,useEffect,useRef} from 'react'
import axios from "axios"

const App = () => {
    const [data, setdata] = useState()
    const [users, setusers] = useState([])
    const [isloading, setisloading] = useState(false)
    const savebtn = useRef()
    const user_id = useRef()
    const handleChange = (e) => {
        setdata(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const fetchUsers = async () => {
      setisloading(true)
      try {
        const response = await axios.get("http://localhost/backend/controllers/DBConnect.php")
        setusers(response.data) 
      } catch (err) {
        console.log(err)
      }
      setisloading(false)
    }
    const handleSubmit = async(e) => {
      e.preventDefault() 
      const request = JSON.stringify(data)
      if (savebtn.current.textContent === "Send"){ 
      try {
        await axios.post("http://localhost/backend/controllers/DBConnect.php", request)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {   
        await axios.put("http://localhost/backend/controllers/DBConnect.php/" + user_id.current, request) 
      }catch (err) {
        console.log(err)
      }
    }
    savebtn.current.textContent = "Send"
  }
    const handleDelete = async(id) => {
      try {
        await axios.delete("http://localhost/backend/controllers/DBConnect.php/" + id)
      } catch (err) {
        console.log(err)
      }
      fetchUsers()
    }
    useEffect(() => {
      fetchUsers()
    }, []);
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Nom:</label>
        <input id='nom' name='nom' onChange={handleChange}></input>
        <label htmlFor="prenom">Prenom:</label>
        <input id='prenom' name='prenom' onChange={handleChange}></input>
        <label htmlFor="email">Email:</label>
        <input id='email' name='email' onChange={handleChange}></input>
        <label htmlFor="classement">Classement:</label>
        <input id='classement' name='classement' onChange={handleChange}></input>
        <button ref={savebtn} type='submit'>Send</button>
    </form>
    <div>{isloading ? <div>Loading...</div> : users.map((user) => {
      const {idEtud,nom,prenom,email,classement} = user
      return ( 
        <div key={idEtud}>
        {idEtud + nom + prenom + email + classement}
        <button onClick={() => {
          user_id.current = idEtud
          savebtn.current.textContent = "Update"
          }}>Edit</button>
        <button onClick={() => {handleDelete(idEtud)}}>Delete</button>
      </div>
      )
    })}</div>
    </>
  )
}

export default App