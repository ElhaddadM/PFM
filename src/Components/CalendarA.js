import React, { useState, useEffect, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { FcCalendar } from 'react-icons/fc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios'
function CalendarA() {
    const [selectTime, setSelectTime] = useState('d-none')
    const RdvTime = useRef('')
    const [serviceSectionCancel, setServiceSectionCancel] = useState('');
    // Ropos Time
    const [timeStartRopos, setTimeStartRopos] = useState()
    const [timeEndRopos, setTimeEndRopos] = useState()
    // Time Start Work
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    // Interval between Every RDV
    const [interval, setInterval] = useState()
    const [timeDispo, setTimeDispo] = useState([])
    //Date actuel Calendar
    const [value, setValue] = useState(new Date());
    const isWeekend = (date: Dayjs) => {
        const Jour = date.date();
        const Mois = parseInt(date.month() + 1);
        const Annee = date.year();
        const weekend = date.day() // 0 pour Dimanche 1 pour les Samedi

        return ([14,20,21,22].includes(Jour) && [3,4].includes(Mois) && [2023].includes(Annee) ||  [8].includes(Mois)  || weekend === 0 ); //m === 3 && day === 10 && a === 2024 
    };
    const handleChange_A = (event: SelectChangeEvent) => {
        setServiceSectionCancel(event.target.value)
        const RDV = {
            date: value.toISOString().slice(0, 10),
            heure: event.target.value
        }
        sessionStorage.setItem('RDV', JSON.stringify(RDV))
        console.log('calendar => ', JSON.stringify(RDV));



    };

    const [selectedTime, setSelectedTime] = useState('');

    const times = [];
    const ropos = [];
    const startTime = new Date(`2023-01-01T${start}:00Z`);
    const endTime = new Date(`2023-01-01T${end}:00Z`); // Adjust end time as needed
    const intervall = interval * 60 * 1000; // 15 minutes in milliseconds
    const ropStart = new Date(`2023-01-01T${timeStartRopos}:00Z`);
    const ropoEnd = new Date(`2023-01-01T${timeEndRopos}:00Z`);

    // console.log(ropStart);

    // Generate time options
    for (let time = startTime; time <= endTime; time = new Date(time.getTime() + intervall)) {
        const formattedTime = time.toISOString().substr(11, 8); // Format time as hh:mm:ss
        const timee = formattedTime.split(':').slice(0, 2).join(':')
        times.push(timee);
    }

    // Generate time ropos
    for (let time = ropStart; time <= ropoEnd; time = new Date(time.getTime() + intervall)) {
        const formattedTime = time.toISOString().substr(11, 8); // Format time as hh:mm:ss
        const timee = formattedTime.split(':').slice(0, 2).join(':')
        ropos.push(timee);
    }

    // console.log('Ropos => ',ropos);
    // exclue times ropos
    // const timeDispo = times.filter(e => {
    //     return !ropos.includes(e)
    // })
    // console.log('TimeDispo => ',timeDispo);

    const selectedDate = (newValue, datee) => {

        console.log('test', datee)
        setValue(newValue)
        if (selectTime === 'd-none') {
            setSelectTime("d-flex")
        }
        const date = value.toISOString().slice(0, 10)
        console.log("DateA 1", datee);

        axios.get(`http://rdv.local/api/rdv/${datee}`)
            .then((response) => {
                response.data.Rdv.map(e => {
                    console.log('map ', e.Heure);
                    ropos.push(e.Heure)

                })
                var timeDispoe = times.filter(e => {
                    return !ropos.includes(e)
                })
                setTimeDispo(timeDispoe)
                console.log('times1', ropos);
                console.log('Hnaaa 1=> ', response.data.Rdv[0].Heure);
            })
        // console.log(value.toString());

    }

    useEffect(() => {
        axios.get("http://rdv.local/api/parametre")
            .then((response) => {
                // setData(response.data.Data)
                setStart(response.data.Parametre[0].WorkStart)
                setEnd(response.data.Parametre[0].WorkEnd)
                setInterval(response.data.Parametre[0].Interval)
                setTimeStartRopos(response.data.Parametre[0].WorkPause)
                setTimeEndRopos(response.data.Parametre[0].WorkPauseEnd)
                // console.log("========> 1", response.data.Parametre[parseInt(s)]);
                // console.log("========> ", response.data.Parametre[0].WorkPause);
                // console.log("========> ", response.data.Parametre[0].WorkEnd);

            });
    }, [])

    return (
        <div className='text-center  d-flex flex-sm-column ' >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                dateForm='DD/MM/YYYY' 
                    disablePast
                    shouldDisableDate = {isWeekend}
                    onOpen={() => { setSelectTime('d-none'); setServiceSectionCancel(''); }}
                    label=" Date "
                    value={value}
                    minDate={dayjs('2017-01-01')}
                    components={{
                        OpenPickerIcon: CalendarMonthIcon,
                    }}
                    onChange={(newValue) => { selectedDate(newValue, newValue.toISOString().slice(0, 10));; }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>


            <FormControl className={selectTime} style={{ width: '74vh', marginTop: '3vh' }} >
                <InputLabel id="demo-simple-select-label">Heure <span className='text-danger text-bold '>*</span> </InputLabel>
                <Select
                    ref={RdvTime}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={serviceSectionCancel}
                    label="Heure"
                    onChange={handleChange_A}

                >
                    <MenuItem value='fals'> Heure RDV </MenuItem>
                    {
                        timeDispo.map((e, i) => {
                            return <MenuItem key={i} value={e}>{e}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </div>
    )
}

export default CalendarA