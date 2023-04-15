import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios'
import Progress from './Progress';
import ReactToPrint from 'react-to-print';
import SearchIcon from '@mui/icons-material/Search';
function Table({ service }) {
    const componentRef = useRef();
    const [dataa, setDataa] = useState([])
    const [show, setShow] = useState('')

    const fetchData = (e = service) => {
        axios.get(`http://127.0.0.1:8000/api/rdv/${e} `)
            .then((response) => {
                setDataa(response.data.Rdv)
                console.log(response.data.Rdv);
                console.log("Data => Table", dataa.length);
            });
    }

    const Search = (e) => {
        const search = dataa.find((item) => {
            return item.NomComplet === e || item.Email === e || item.Date === e || item.Heure === e || item.Token === e || item.Tele === e
        })
        search == undefined ? setShow('no record') : setDataa([search]);
        if (search !== undefined) {
            setDataa([search])
            setShow('')
        } else if (e == '') { fetchData(); setShow('') } else {
            {
                setShow('no record')
            }
        }
        // e === '' ? fetchData() : setShow("no record");;
        // console.log('S => ', search);
        // setShow('')
    }
    useEffect(() => {
        fetchData()
        console.log('D5l', dataa.length);


    }, []);



    const handleUpdate = (e) => {
        console.log(e);
        const DATA = JSON.parse(e)
        const id = DATA.id
        console.log('ID => ', id);
        const RDV = {
            "NomComplet": DATA.NomComplet,
            "Email": DATA.Email,
            "Tele": DATA.Tele,
            "Date": DATA.Date,
            "Heure": DATA.Heure,
            "Service": DATA.Service,
            "Token": DATA.Token,
            "Status": 'true'

        }
        console.log('RDV ', RDV);
        axios.put(`http://127.0.0.1:8000/api/rdv/${id}`, RDV)
            .then((response) => {

                fetchData()
                console.log(response.data);


            });

    }
    return (
        <div className=" ">


            <div className='d-flex  w-50' >
                <div className='input-group  w-50'>
                    <SearchIcon sx={{fontSize:30}} />
                    <input className="form-control me-2 w-50" onChange={(e) => { Search(e.target.value) }} type="search" placeholder="Search" aria-label="Search" /> <span className='text-center py-auto text-danger' > {show} </span>

                </div>
                <div className=' position-absolute top-5 end-0  pe-5'><ReactToPrint
                    trigger={() => <IconButton aria-label="delete"><PrintIcon sx={{ fontSize: 30 }} /></IconButton>}
                    content={() => componentRef.current}
                />
                </div>
            </div>

            <table className="table caption-top table-hover table-responsive   " ref={componentRef}>

                <caption>Liste Des Rendez-vous pour Le {service} </caption>
                <thead className='table-primary'>
                    <tr>
                        <th scope="col">N° </th>
                        <th scope="col"> NomComplet </th>
                        <th scope="col">Email</th>
                        <th scope="col">Tele</th>
                        <th scope="col">Date</th>
                        <th scope="col">Heure</th>
                        <th scope="col"> Token </th>
                        <th scope="col"> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {dataa.length > 0 && show === '' ? dataa.map((e, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row"> {i + 1} </th>
                                <td> {e.NomComplet} </td>
                                <td> {e.Email} </td>
                                <td> {e.Tele} </td>
                                <td> {e.Date} </td>
                                <td> {e.Heure} </td>
                                <td> {e.Token} </td>
                                <td>
                                    {e.Status === "false" ?
                                        <Button name={JSON.stringify(e)} onClick={(e) => { handleUpdate(e.target.name); }} color='success' variant="outlined" size="small" endIcon={<HourglassEmptyIcon color='success' />}>
                                            encore
                                        </Button> :
                                        <Button color='warning' variant="outlined" size="small" endIcon={<DoneOutlineIcon color='warning' />}>
                                            Terminer
                                        </Button>
                                    }

                                </td>
                            </tr>
                        )
                    }) : <span className='text-center'>  <Progress /> </span>

                    }

                </tbody>
            </table>
        </div>
    )
}

export default Table