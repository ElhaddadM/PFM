import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


function TableEmp() {
    const fullName = useRef('')
    const Tele = useRef('')
    const Email = useRef('')
    const Password = useRef('')
    const Service = useRef('')
    const [name,setName] = useState('mb-3')
    const [tele,setTele] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serviceE,setServiceE] = useState('')
    const [staticModal, setStaticModal] = useState(false);

    const toggleShow = () => setStaticModal(!staticModal);
    const [data, setData] = useState([])

const handleName = (name)=>{
    (name).length >= 4 && (/^[a-zA-Z]*$/).test(name) ? setName('mb-3 form-control is-valid ') : setName("mb-3 form-control is-invalid ")
    

}
const handleTele = (tel)=>{
    (/^(06|07)[0-9]{8}$/).test(tel) || (/^(\+212)[0-9]{9}$/).test(tel) && (tel).length > 0 ? setTele('mb-3 form-control is-valid ') : setTele("mb-3 form-control is-invalid ") 
  
}
const handlEmail = (em)=>{
    (/(.+)@(.+){2,}\.(.+){3}/).test(em) && (em).length > 0 ? setEmail('mb-3 form-control is-valid ') : setEmail("mb-3 form-control is-invalid ");
    
}
const handlePassword = (pa)=>{
    (pa).length >= 6 ? setPassword('mb-3 form-control is-valid ') : setPassword("mb-3 form-control is-invalid ")

}
const handleService = (ser)=>{
    
    setServiceE(ser)
}



    // const [service, setService] = useState([])
    const service = []

    const fetch = () => {
        axios.get(` http://127.0.0.1:8000/api/employee `)
            .then((response) => {
                setData(response.data.Employees)

                console.log(response.data.Employees);
                console.log("Data Pa => ", data.length);

            });


    }

    const DeletEmp = (id) => {
        console.log('hona ', id);
        axios.delete(` http://127.0.0.1:8000/api/employee/${id} `)
            .then((response) => { console.log('Success'); fetch() })
    }
    const UpdateEmp = (id, v, t, k) => {
        const obj = []
        switch (t) {
            case "Nom":
                const ob1 = { 'NomComplet': v, "Tele": k.Tele, "Email": k.Email, 'Password': k.Password, 'Service': k.Service, 'Type': k.Type }
                obj.push(ob1)
                break;
            case "Tele":
                const ob2 = { 'NomComplet': k.NomComplet, "Tele": v, "Email": k.Email, 'Password': k.Password, 'Service': k.Service, 'Type': k.Type }
                obj.push(ob2)
                break;
            case "Email":
                const ob3 = { 'NomComplet': k.NomComplet, "Tele": k.Tele, "Email": v, 'Password': k.Password, 'Service': k.Service, 'Type': k.Type }
                obj.push(ob3)
                break;
            case "Password":
                const ob4 = { 'NomComplet': k.NomComplet, "Tele": k.Tele, "Email": k.Email, 'Password': v, 'Service': k.Service, 'Type': k.Type }
                obj.push(ob4)
                break;
            case "Service":
                const ob5 = { 'NomComplet': k.NomComplet, "Tele": k.Tele, "Email": k.Email, 'Password': k.Password, 'Service': v, 'Type': k.Type }
                obj.push(ob5)
                break;
            case "Type":
                const ob6 = { 'NomComplet': k.NomComplet, "Tele": k.Tele, "Email": k.Email, 'Password': k.Password, 'Service': k.Service, 'Type': k.Type }
                obj.push(ob6)
                break;

            default:
                console.log('Walo');
                break;
        }
        console.log('Row ', obj, ' ', id);
        axios.put(` http://127.0.0.1:8000/api/employee/${id} `, obj[0])
            .then((response) => {
                fetch()

                // setData(response.data.data)
                console.log('Success');
            });
    }

    useEffect(() => {
        fetch()

    }, []);
    const handlSubmit = ()=>{
        const employee = {
            "NomComplet" : fullName.current.value ,
            "Tele" : Tele.current.value ,
            "Email" :Email.current.value ,
            "Password" : Password.current.value ,
            "Service" : serviceE
        }
        axios.post(`http://127.0.0.1:8000/api/employee`, employee)
        .then((response) => {
            console.log('Success');
            fetch()
            fullName.current.value =''
            Tele.current.value =''
            Email.current.value =''
            Password.current.value =''
            setServiceE('')
            setName("mb-3 ")
        });
        console.log('Employee ', employee);
    }



    return (

        <div>
            <table class="table table-bordered  border-primary" style={{ width: "90vw" }}>
                <thead>
                    <caption className='w-100 d-flex'> List des Employees ...  </caption>
                    <Button variant="contained" size="small" className='mb-2' onClick={toggleShow} >
                        Ajoute employee
                    </Button>


                    <tr key="z" className='text-center'>
                        <th key="1" > Nom Complet  </th>
                        <th key="2"> Tele </th>
                        <th key="3"> Email </th>
                        <th key="4"> Password </th>
                        <th key="5"> Service </th>

                        <th key="7"> Action  </th>

                    </tr>

                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map((e, i) => {
                            return (
                                <tr key={i + 2}>
                                    <td key={i + 1} > <input key={i + 6} type="text" defaultValue={e.NomComplet} name={e.id} onChange={(p) => { UpdateEmp(p.target.name, p.target.value, 'Nom', e) }} /> </td>
                                    <td key={i + 1} > <input key={i + 6} type="text" defaultValue={e.Tele} name={e.id} onChange={(p) => { UpdateEmp(p.target.name, p.target.value, 'Tele', e) }} /> </td>
                                    <td key={i + 1} > <input key={i + 6} type="text" defaultValue={e.Email} name={e.id} onChange={(p) => { UpdateEmp(p.target.name, p.target.value, 'Email', e) }} /> </td>
                                    <td key={i + 1} > <input key={i + 6} type="password" placeholder="#############" name={e.id} onChange={(p) => { UpdateEmp(p.target.name, p.target.value, 'Password', e) }} /> </td>

                                    <td key={i + 3}>
                                        <div key={i + 7} className='d-flex  justify-content-between px-2 '>
                                            {e.Service}
                                            <select key={i + 10} name={e.id} onChange={(p) => { UpdateEmp(p.target.name, p.target.value, 'Service', e) }}  >
                                                <option value="Service A" key={i + 11}> Service A </option>
                                                <option value='Service B' key={i + 8} >Service B </option>
                                                <option value="Service C" key={i + 9}>Service C </option>
                                                <option value="All" key={i + 5}> All </option>

                                            </select>
                                        </div>
                                    </td>
                                    {/* <td> {e.Type} </td> */}
                                    <td key={i + 4} >  <button name={e.id} className="btn btn-outline-danger btn-sm m-0" onClick={(w) => { DeletEmp(w.target.name) }} > Supprimer </button> </td>
                                </tr>
                            )
                        })
                            :
                            console.log("walo")

                    }

                </tbody>


            </table>


            {/* <MDBBtn onClick={toggleShow}>Launch static backdrop modal</MDBBtn> */}

            <MDBModal staticBackdrop tabIndex='-1' className='mt-5' show={staticModal} setShow={setStaticModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle> Ajoute Employee </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className=''>
                                <MDBInput label='Nom Complet' id='formControlDefault' type='text'   className={name} onChange={(e)=>{handleName(e.target.value)}} ref={fullName} />
                                <MDBInput label='Tele' id='formControlDefault' type='text'  className={tele} onChange={(e)=>{handleTele(e.target.value)}}  ref={Tele} />
                                <MDBInput label='Email' id='formControlDefault' type='text'  className={email} onChange={(e)=>{handlEmail(e.target.value)}} ref={Email} />
                                <MDBInput label='Password' id='formControlDefault' type='text' className={password} onChange={(e)=>{handlePassword(e.target.value)}} ref={Password} />
                                <Box sx={{ minWidth: 60 }} className="mb-2">
                                    <FormControl fullWidth className='h-50'>
                                        <InputLabel id="demo-simple-select-label">Service <span className='text-danger text-bold '>*</span> </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={serviceE}
                                            label="Service"
                                            onChange={(e)=>{handleService(e.target.value)}}
                                            ref={Service}
                                        >
                                            <MenuItem value="service A">Service A</MenuItem>
                                            <MenuItem value="service B">Service B</MenuItem>
                                            <MenuItem value="service C">Service C</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn  onClick={handlSubmit} >Ajouter</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>



        </div>
    )
}

export default TableEmp