import React, { useState } from 'react'
import axios from 'axios'
function SignUp() {
    const [lnam, setLnam] = useState('')
    const [fnam, setFnam] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [data,setData] = useState([])
const FetchData = () =>{
    const id = 1
    axios.get(`http://dev201.com/api/posts/${id}`)
    .then((response) => {
        console.log(response.data);
        
    })
}
    const handlSubmit = () => {
        const obj = {
            "LastName": lnam,
            "FirstName": fnam,
            "Email": email,
            "Number": number,
            "Password": password
        }
        console.log('data => ', obj);
        axios.get("http://dev201.com/api/signUp")
            .then((response) => {
                console.log(response.data);
                setData(response.data)
            })
            axios.post("http://dev201.com/api/signUp",obj)
            .then((response) => {
                console.log(response);
                
            })
    }
// handlSubmit()



    return (
        <div>
            <label> LastName </label>
            <input type="text" className='ok' onChange={(e) => { setLnam(e.target.value) }} /> <br />
            <label> FirstNAm </label>
            <input type="text" className='ok' onChange={(e) => { setFnam(e.target.value) }} /> <br />
            <label> Email </label>
            <input type="text" className='ok' onChange={(e) => { setEmail(e.target.value) }} /> <br />
            <label> Numer </label>
            <input type="text" className='ok' onChange={(e) => { setNumber(e.target.value) }} /> <br />
            <label> PAssword </label>
            <input type="text" className='ok' onChange={(e) => { setPassword(e.target.value) }} /> <br />
            <button onClick={FetchData}> SignUp </button> <br/>
            <div>
                <ol>

            
                {
                    data.map((e,i)=>{
                        return ( <li key={i}> { e.LastName} </li>)
                    })
                }
                    </ol>
            </div>
        </div>
    )
}

export default SignUp