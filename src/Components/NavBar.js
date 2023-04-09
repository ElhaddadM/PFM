import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBNavbar,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFreeCancellation } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function NavBar() {
    const email = useRef('')
    const token = useRef('')
    const ID = useRef('')
    const emailF = useRef('')

    const [fullscreenXlModal, setFullscreenXlModal] = useState(false);
    // Modal Code Oublier UseState
    const [optSmModalA, setOptSmModalA] = useState(false);
    const [rdvSection, setRdvSection] = useState('d-flex ')
    const [data, setData] = useState([])
    const route = useNavigate()
    const [showNavColorThird, setShowNavColorThird] = useState(false);
    const [serviceSectionCancel, setServiceSectionCancel] = useState('');
    const [serviceSectionCancelForgot, setServiceSectionCancelForgot] = useState('');
    const [sectionCancel, setSectionCancel] = useState('d-none')

    const toggleShow = () => { setFullscreenXlModal(!fullscreenXlModal) };
    const toggleShowA = () => { setOptSmModalA(!optSmModalA) };

    useEffect(() => {
        if (fullscreenXlModal !== true) setServiceSectionCancel('')

        if (serviceSectionCancel != '') {
            setSectionCancel('d-block')

        } else {
            setSectionCancel('d-none')
        }

    })
    const handleChange_A = (event: SelectChangeEvent) => {
        setServiceSectionCancel(event.target.value);


    };
    const handleChange_B = (event: SelectChangeEvent) => {
        setServiceSectionCancelForgot(event.target.value);


    };

    //Display RDV For cancel
    const handlCancel = () => {
        const RDV = {
            Service: serviceSectionCancel,
            Email: email.current.value,
            Token: token.current.value
        }
        console.log('Cancel ', JSON.stringify(RDV));
        //    fetch('http://rdv.local/api/rdv/cancel", RDV')
        //    .then(respo => respo.json())
        //    .then(json => console.log('Data ', json))
        axios.post("http://rdv.local/api/rdv/cancel", RDV)
            .then((response) => {
                setData(response.data.Data)
                console.log(response.data.Data);
            });
        setServiceSectionCancel('')
        email.current.value = ''
        token.current.value = ''

    }
    const RdvAnnuler = () => {
        const id = ID.current.value
        axios.delete(`http://rdv.local/api/rdv/${id}`)
            .then((response) => {
                // setData(response.data.Data)
                console.log(response.data.status);
                alert(response.data.status)
            });
    }

    const Token = () => {
        const info = {
            Service: serviceSectionCancelForgot,
            Email: emailF.current.value
        }
        axios.post("http://rdv.local/api/rdv/token", info)
            .then((response) => {
                // setData(response.data.Data)
                console.log("========> ", response.data.Data[0].Token);
                const data = {
                    Email: emailF.current.value,
                    Name: response.data.Data[0].NomComplet,
                    Token: response.data.Data[0].Token

                }
                axios.post("http://rdv.local/api/email/reset", data)
                    .then((response) => {
                        // setData(response.data.Data)
                        console.log("========> ", response.data.Data[0].Token);
                        alert(response.data.Data[0].Token)
                    });
            });
    }
    return (
        <div>
            <MDBNavbar className='d-flex justify-content-between px-4' light style={{ backgroundColor: '#e3f2fd' }}>
                <div>Logo</div>
                <button className='btn btn-danger' color='danger' onClick={toggleShow}>
                    <MdFreeCancellation className='' />  <span>Annuler RDV</span>
                </button>
            </MDBNavbar>


            <MDBModal tabIndex='-1' show={fullscreenXlModal} setShow={setFullscreenXlModal} >
                <MDBModalDialog size='fullscreen' className=''>
                    <MDBModalContent className=' '>
                        <MDBModalHeader >
                            <MDBModalTitle className='text-center ' style={{ marginLeft: "10vh" }}>Annuler rendez-vous</MDBModalTitle>
                            <MDBBtn
                                type='button'
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='bg-inf bg-img-modal px-auto ' >
                            <div className=' border my-4 bg-white shadow-lg p-3 mb-5 bg-body rounded w-75   mx-auto p-4'>
                                <Box sx={{ minWidth: 120 }} className="mb-2">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Service <span className='text-danger text-bold '>*</span> </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={serviceSectionCancel}
                                            label="Service"
                                            onChange={handleChange_A}

                                        >

                                            <MenuItem value="service A">Service A</MenuItem>
                                            <MenuItem value="service B">Service B</MenuItem>
                                            <MenuItem value="service C">Service C</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <div className={sectionCancel}>
                                    <Form.Floating className=' mx-auto text-center mb-3 '  >
                                        <Form.Control
                                            id="floatingInputCustom"
                                            type="email"
                                            placeholder="Email address"
                                            ref={email}
                                        />
                                        <label htmlFor="floatingInputCustom">Email address <span className='text-danger'>*</span></label>
                                    </Form.Floating>
                                    <Form.Floating className=' mx-auto text-center mb-3 '>
                                        <Form.Control
                                            id="floatingInputCustom"
                                            type="text"
                                            placeholder="Code"
                                            ref={token}
                                        />
                                        <label htmlFor="floatingInputCustom">Code </label>
                                    </Form.Floating>

                                    <span className=' text-primary code-forget' onClick={toggleShowA} > Vous avez oublié votre code de confirmation? </span>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <MDBBtn onClick={handlCancel} > <MDBIcon far icon="calendar-alt" className='' size='1x' /> Mes rendez-vous</MDBBtn>
                                    </div>
                                </div>
                                <div className={rdvSection} style={{ justifyContent: 'center', marginTop: '3vh' }} >
                                    <ul>
                                        {data.length > 0 ? data.map((e, i) => {
                                            return (
                                                <div>
                                                    <input type="hidden" readOnly value={e.id} ref={ID} />

                                                    <table className="table table-bordered border-primary " style={{ width:'50vw' }}>
                                                        <thead>
                                                            <tr key={i}>
                                                                <th>Nom Complet</th>
                                                                <th>Service </th>
                                                                <th>Date</th>
                                                                <th>Heure</th>
                                                                <th>action</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr key={i + 1}>
                                                                <td>{e.NomComplet} </td>
                                                                <td>{e.Service}  </td>
                                                                <td>{e.Date} </td>
                                                                <td>{e.Heure} </td>
                                                                <td> <button onClick={RdvAnnuler} > Annuler</button> </td>
                                                            </tr>
                                                        </tbody>

                                                    </table>
                                                </div>
                                            )

                                        }) : ""}
                                    </ul>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type='button' color='secondary' onClick={toggleShow}>
                                Closee
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {/* Modal Code Oublier */}


            <MDBModal show={optSmModalA} tabIndex='-1' className='' setShow={setOptSmModalA}>
                <MDBModalDialog size='fullscreen-sm-down'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Renvoyer code de confirmation</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowA}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Box sx={{ minWidth: 120 }} className="mb-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Service <span className='text-danger text-bold '>*</span> </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={serviceSectionCancelForgot}
                                        label="Service"
                                        onChange={handleChange_B}

                                    >
                                        <MenuItem value="Service A">Service A</MenuItem>
                                        <MenuItem value="Service B">Service B</MenuItem>
                                        <MenuItem value="Service C">Service C</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Form.Floating className=' mx-auto text-center mb-3 '>
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="email"
                                    placeholder="name@example.com"
                                    ref={emailF}
                                />
                                <label htmlFor="floatingInputCustom">Email address</label>
                            </Form.Floating>
                            <div className='d-flex justify-content-center'>
                                <MDBBtn onClick={Token} > <MDBIcon fas icon="location-arrow" /> Renvoyer</MDBBtn>
                            </div>

                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


        </div >
    )
}

export default NavBar