
import { FcCalendar } from 'react-icons/fc';
import React, { useRef, useState, useLayoutEffect } from 'react';
import confirmer from '../assets/img/flag/confirmer.jpg'
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
    MDBIcon,
    MDBValidation,
    MDBValidationItem

} from 'mdb-react-ui-kit';


import { MDBInput } from 'mdb-react-ui-kit';
import CalendarB from './CalendarB';
import { Route, useNavigate } from 'react-router-dom';

function Service_B() {
    const FullName = useRef('')
    const Email = useRef('')
    const Tele = useRef('')
    const [name, setName] = useState('mb-3 ')
    const [email, setEmail] = useState('mb-3 ')
    const [tele, setTele] = useState('mb-3 ')
    const [info, setInfo] = useState(true)
    const [infoV, setInfoV] = useState(false)
    const [counta, setCounta] = useState(0)

    const [suivant, setSuivant] = useState(true)
    const [token, setToken] = useState((Math.floor((Math.random() * 10000) + 50)).toString())
    const [footerM, setFooterM] = useState({ btnsA: "d-block", btnsB: 'd-none ', prise: 'd-none', confirmer: 'd-none' })
    const [staticModal, setStaticModal] = useState(false);

    const toggleShow = () => setStaticModal(!staticModal);
    setInterval(() => {

        if (JSON.parse(sessionStorage.getItem('RDV')) === null) {
            setSuivant(true)
        } else {
            setSuivant(false)
        }
        // counta === 3 ? setInfoV(true) : setInfoV(false) 
        // console.log('Count => ',counta);
    }, 1000);
    const handleName = (e) => { (e.target.value).length >= 4 ? setName('mb-3 form-control is-valid ') : setName("mb-3 form-control is-invalid ") && setCounta(counta - 1) }
    const handleEmail = (e) => { (/(.+)@(.+){2,}\.(.+){2,}/).test(e.target.value) && (e.target.value).length > 0 ? setEmail('mb-3 form-control is-valid ') && setCounta(counta + 1) : setEmail("mb-3 form-control is-invalid ") }
    const handleTele = (e) => { (/^(06|07)[0-9]{8}$/).test(e.target.value) || (/^(\+212)[0-9]{9}$/).test(e.target.value) && (e.target.value).length > 0 ? setTele('mb-3 form-control is-valid ') && setCounta(parseInt(counta) + 1) : setTele("mb-3 form-control is-invalid ") && setCounta(counta - 1) }
    const handleValider = () => {
        //    ( FullName.current.value).length > 0 ? (Email.current.value).length > 0 ?  (Tele.current.value).length > 0 ? console.log('d accord') : console.log('non') :console.log("12");
        const ok = {
            Email: Email.current.value,
            Token: token
        }
        console.log('okk => ', ok);

        axios.post("http://rdv.local/api/email/token", ok)
            .then((response) => {
                console.log(response);


            });
        setFooterM({ btnsA: 'd-none', btnsB: 'd-none', prise: 'd-block', confirmer: 'd-none' })


        console.log('ok', token);
        // console.log('Count => ', counta);


    }
    const handleClickValider = () => {
        const rdv = JSON.parse(sessionStorage.getItem('RDV'))

        console.log('Token ==> ', token);
        const RDV = {
            NomComplet: FullName.current.value,
            Email: Email.current.value,
            Tele: Tele.current.value,
            Date: rdv.date,
            Heure: rdv.heure,
            Service: 'service B',
            Token: token
        }
        const status = {
            Email: Email.current.value,
            Name: FullName.current.value,
            Date: rdv.date,
            Heure: rdv.heure,
            Token: token

        }
        axios.post("http://rdv.local/api/rdv", RDV)
            .then((response) => {
                console.log(response);
                setFooterM({ btnsA: 'd-none', btnsB: 'd-none', prise: 'd-none', confirmer: 'd-block' })
                axios.post("http://rdv.local/api/email/confirm", status)
                    .then((response) => {
                        console.log("ok");

                    });
            });

        console.log('RDV => :', RDV);


    }


    return (
        <div className=" border my-4 bg-white shadow-lg p-3 mb-5 bg-body rounded   " >




            <div className='py-2 px-4'>
                <h1 className='text-primary' >Service B </h1>   

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolorum.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, velit.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, velit.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, velit.
                </p>
                <div className="my-4 d-flex justify-content-end" >
                    <button className='mx-2 btn btn-primary' color='primary' onClick={toggleShow}>
                        <span>Prendre rendez-vous</span> <FcCalendar size={20} />

                    </button>
                </div>
            </div>

            {/* Modal */}
            <div>

                <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle> Service B </MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}> </MDBBtn>
                            </MDBModalHeader>
                            {/* Body of Modal */}
                            <MDBModalBody >

                                <div className={footerM.btnsA}>


                                    <CalendarB  />


                                </div>
                                <div className={footerM.btnsB} >
                                    {/* <MDBValidation className=''  isValidated > */}
                                    {/* <MDBValidationItem className='form-control is-valid'  > */}
                                    <MDBInput className={name} label='Nom Complete *' type='text' required ref={FullName} onChange={(e) => { handleName(e) }} />

                                    {/* </MDBValidationItem> */}
                                    {/* </MDBValidation> */}



                                    <MDBInput className={email} label='Email*' required type='text' ref={Email} onChange={(e) => { handleEmail(e) }} />






                                    <MDBInput className={tele} label=' Num Tele * ' type='text' ref={Tele} required onChange={(e) => { handleTele(e) }} />











                                    {/* -------------------------------------------------------------------------------------------------------------------- */}
                                    {/* <MDBValidation className=''   >
                                        <MDBValidationItem className='pt-1 '   >
                                            <MDBInput className="mb-3 " label='Nom Complete' type='text' ref={FullName} onChange={(e) => { (e.target.value).length > 0 ? console.log('ui') : console.log('non'); }} />

                                        </MDBValidationItem>

                                    </MDBValidation> */}

                                </div>
                                <div className={footerM.prise}>

                                    <div className='text-center'>
                                        <p className='fs-4 display-2'>
                                            vous avez pris votre rendez-vous avec succès !
                                        </p>
                                        <p>
                                            nous avons envoyé un email de confirmation à <span className='text-primary tex'> {Email.current.value}  </span>  Pour confirmer votre rendez-vous.
                                        </p>
                                        <div className='w-50 text-center mx-auto' >
                                            <MDBInput className="mb-3  " label='Code de confirmation *' onChange={(e) => { (e.target.value) === token ? setInfo(false) : setInfo(true) }} type='text' />

                                        </div>

                                        <MDBBtn color='info' disabled={info} className='px-4' onClick={handleClickValider} > Confirmer </MDBBtn>
                                    </div>


                                </div>
                                <div className={footerM.confirmer}>
                                    <div className='text-center'>
                                        <img src={confirmer} alt="" className='img-fluid ' style={{ width: '40vh' }} />

                                        <p className='fs-3  '>
                                            votre rendez-vous est Bien confirmé
                                        </p>
                                        <span className=' '>
                                            En confirmant votre rendez-vous, vous vous engagez à être présent au jour et à l’heure du rendez-vous.En cas d’empêchement, merci d’annuler votre rendez-vous.
                                        </span> <br />
                                        <MDBBtn outline color='secondary' className=' mt-3' onClick={() => { window.location.reload() }} > Page d'accueil  </MDBBtn>

                                    </div>



                                </div>


                            </MDBModalBody>
                            <MDBModalFooter>
                                <div className={footerM.btnsA}>
                                    <MDBBtn color='secondary' className='me-2 px-4' onClick={toggleShow}>
                                        Fermer
                                    </MDBBtn>
                                    <MDBBtn disabled={suivant} onClick={() => { setFooterM({ btnsA: 'd-none', btnsB: 'd-block', prise: 'd-none', confirmer: 'd-none' }) }} className='px-4' > Suivant <MDBIcon fas icon="long-arrow-alt-right" />  </MDBBtn>
                                </div>
                                <div className={footerM.btnsB} >
                                    <MDBBtn color='warning' onClick={() => { setFooterM({ btnsA: 'd-block', btnsB: 'd-none', prise: 'd-none', confirmer: 'd-none' }) }} className='me-2 '>
                                        <MDBIcon fas icon="long-arrow-alt-left" /> Précédent
                                    </MDBBtn>
                                    <MDBBtn color='success' className='px-4' onClick={handleValider} disabled={infoV} > Valider </MDBBtn>
                                </div>
                                {/* style={{position:'absolute',top:'-.5vh',left:'38vw'}} */}



                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        </div>
    )

}

export default Service_B