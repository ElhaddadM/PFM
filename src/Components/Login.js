import React, { useRef, useState } from 'react'
import imglogin from "../assets/img/flag/login.jpg"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import {
  MDBInputGroup,
  MDBIcon,
  MDBBtn,

} from 'mdb-react-ui-kit';


function Login() {
  const [show, setShow] = useState(true);
  const [mesg, setMesg] = useState("");
  const [email, setEmail] = useState('')
  const password = useRef('')
  const route = useNavigate()
  const handleSubmit = () => {
    const info = {
      "Email": email,
      "Password": password.current.value
    };
    (/(.+)@(.+){2,}\.(.+){3}/).test(email) ?
      axios.post("http://rdv.local/api/employee/login", info)
        .then((response) => {
          console.log(response.data.Employee);
          response.data.Employee.length > 0 ? sessionStorage.setItem('log', JSON.stringify({ 'user': response.data.Employee[0].NomComplet, "service": response.data.Employee[0].Service ,'type' : response.data.Employee[0].Type })) : notify("Email OR Password Invalid!")
          response.data.Employee.length > 0 ? route('/dashboard') : notify("Email OR Password Invalid!")
        }).catch(error => {
          notify("Email OR Password Invalid!")
          console.error('There was an error!', error);
        })
      : notify(" Invalid Email !")


  }

  const notify = (text) => {
    toast.error(text, { 
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (

    <div className='container-fluid '  >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='row login  '  >

        <div className="col-6   d-none d-sm-block d-md-block d-lg-block d-xl-block ">
          <img src={imglogin} alt="" className='img-fluid w-100  d-none d-sm-block d-md-block d-lg-block d-xl-block' />
        </div>
        <div className=" col-sm-12 col-md-6 col-lg-6 col-xl-6 " style={{ backgroundColor: "#0E5E6F" }} >
          <h2 className='text-center my-5 text-white '>Login</h2>
          <div className='my-4 px-5'>
            <MDBInputGroup className='mb-3 ' textAfter={<MDBIcon fas icon="envelope" />}>

              <input className='form-control ' type='email' required placeholder=" Email@example.com " onChange={(e) => { (/(.+)@(.+){2,}\.(.+){3}/).test(e.target.value) ? setEmail(e.target.value) : setEmail(e.target.value) }} />


            </MDBInputGroup>

            <div className="input-group mb-3 ">
              <input type={show ? 'password' : "text"} ref={password} required className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
              <span className="input-group-text" onClick={() => { setShow(!show) }}> {show ? <VisibilityOffIcon /> : < VisibilityIcon />}  </span>
              <span className="input-group-text">  <MDBIcon fas icon="key" /></span>
            </div>

            <MDBBtn rounded className='w-100 ' onClick={handleSubmit} id="liveToastBtn" >Login</MDBBtn>
          </div>
        </div>




      </div>






    </div>
  )
}

export default Login