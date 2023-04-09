import React from 'react'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import NavBar from "./Components/NavBar";
import bg from "./assets/img/flag/bg.jpg"
import Service_A from "./Components/Service_A";
import Service_B from "./Components/Service_B";
import Service_C from "./Components/Service_C";
import Footer from "./Components/Footer";
import { Modal } from "react-bootstrap";
function Home() {
    return (
        <div>
            <NavBar />
            <Modal />
            <MDBContainer fluid   >
                <MDBRow className="mt-2">
                    <div className="bg-img text-center rounded"   >
                        <div className="text-danger d-flex justify-content-center align-items-center py-5">
                            <h1>Slegant</h1>
                        </div>
                    </div>
                </MDBRow>
                <MDBRow className="mx-2">
                    <Service_A />
                </MDBRow>
                <MDBRow className="mx-2">
                    <Service_B />
                </MDBRow>
                <MDBRow className="mx-2">
                    <Service_C />
                </MDBRow>

            </MDBContainer>

            <Footer />
        </div>
    )
}

export default Home
