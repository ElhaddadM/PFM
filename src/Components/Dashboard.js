import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Table from './Dashboard/Table';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/Avatar/homme-daffaire.png'


// Cards
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader
} from 'mdb-react-ui-kit';
//Icons 
import GridViewIcon from '@mui/icons-material/GridView';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TaskIcon from '@mui/icons-material/Task';
import PieShart from './Dashboard/PieShart';
import BarShart from './Dashboard/BarShart';
import { ToastContainer, toast } from 'react-toastify';
import TableParam from './Dashboard/TableParam';
import TableEmp from './Dashboard/TableEmp';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const [session, setSession] = useState({})
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dashboard, setDashboard] = React.useState('d-none')
  const [paramettre, setParamettre] = React.useState('d-none')
  const [compte, setCompte] = React.useState('d-none')
  const [service, setService] = React.useState({ A: 'd-none', B: 'd-none', C: 'd-none' })
  const [data, setData] = useState([])
  const route = useNavigate()


  const fetchData = (service) => {




    axios.get(`http://rdv.local/api/rdv/${service} `)
      .then((response) => {
        setData(response.data.Rdv)
        console.log(response.data.Rdv);
        console.log("Data => ", data);
      });

  }



  useEffect(() => {

    sessionStorage.getItem('log') === null ? route('/login') : setSession(JSON.parse(sessionStorage.getItem('log')))
    console.log('Session =><<>>> ', JSON.parse(sessionStorage.getItem('log')).service);
    switch (JSON.parse(sessionStorage.getItem('log')).service) {
      case "Service A":
        setDashboard('d-none')
        setService({ A: 'd-block', B: 'd-none', C: 'd-none' })
        break;
      case "Service B":
        setDashboard('d-none')
        setService({ A: 'd-none', B: 'd-block', C: 'd-none' })
        break;
      case "Service C":
        setDashboard('d-none')
        setService({ A: 'd-none', B: 'd-none', C: 'd-block' })
        break;
      default:
        // notify()
        setDashboard('d-block')
        setService({ A: 'd-none', B: 'd-none', C: 'd-none' })
        break;
    }
    // fetchData()
    axios.get(`http://rdv.local/api/rdv/Service A `)
      .then((response) => {
        setData(response.data.Rdv)
        console.log(response.data.Rdv);
        console.log("Data => ", data);
      });
    console.log(sessionStorage.getItem('update'));
    console.log('Session');
  }, [])

  const notify = () => {
    toast.error(" Vous N'avez-pas Le Droit à ce Service !! ", {
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
  const ListItems = [
    {
      id: 1,
      text: 'Dashboard',
      action: () => { if (session.service !== 'All') { setDashboard('d-none'); notify() } else { setDashboard('d-block'); setService({ A: 'd-none  ', B: 'd-none', C: 'd-none' }) } }
    },
    {
      id: 2,
      text: 'Service A',
      action: () => { if (session.service === 'Service A' || session.service === 'All') { setCompte('d-none'); setParamettre('d-none'); setService({ A: 'd-block', B: 'd-none', C: 'd-none' }); setDashboard('d-none'); fetchData('service A') } else { notify() } }
    },
    {
      id: 3,
      text: 'Service B',
      action: () => { if (session.service === 'Service B' || session.service === 'All') { setCompte('d-none'); setParamettre('d-none'); setService({ A: 'd-none', B: 'd-block', C: 'd-none' }); setDashboard('d-none'); fetchData('Service B') } else { notify() } }
    },
    {
      id: 4,
      text: 'Service C',
      action: () => { if (session.service === 'Service C' || session.service === 'All') { setCompte('d-none'); setParamettre('d-none'); setService({ A: 'd-none', B: 'd-none', C: 'd-block' }); setDashboard('d-none'); fetchData('Service C') } else { notify() } }

    }

  ]


  const ListAdmin = [
    {
      id: 1,
      label: "Parramettre",
      action: () => { if (session.service !== 'All') { setDashboard('d-none'); notify() } else { setDashboard('d-none'); setCompte('d-none'); setParamettre('d-block'); setService({ A: 'd-none  ', B: 'd-none', C: 'd-none' }) } }
    },
    {
      id: 2,
      label: "Compte",
      action: () => { if (session.service !== 'All') { setDashboard('d-none'); notify() } else { setDashboard('d-none'); setParamettre('d-none'); setCompte('d-block'); setService({ A: 'd-none  ', B: 'd-none', C: 'd-none' }) } }

    }
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>

        <Toolbar className="position-relative">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />

          </IconButton>

          <span className=' ' >
            <span className="">  Institut ........ </span>
            <span className=' position-absolute top-0 end-0  pe-5  ' style={{ marginTop: '1.5vh' }}>
              <div className="btn-groupe">

                <Avatar alt=" Tape Here  " src={avatar} data-bs-toggle="dropdown" aria-expanded="false" />

                {/* <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Action
                </button> */}
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">  {session.user}   </a></li>
                  <li><a className="dropdown-item" href="#">  {session.service} </a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li onClick={() => { sessionStorage.removeItem('log'); route('/login') }} ><a className="dropdown-item" href="#" > Deconnecté </a></li>
                </ul>
              </div>

            </span>
          </span>






        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {ListItems.map((e, index) => (
            <ListItem key={e.text} disablePadding sx={{ display: 'block' }}  >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,

                }}
                onClick={e.action}

              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? <GridViewIcon /> : index === 1 ? <AddTaskIcon /> : index === 2 ? <PlaylistAddCheckIcon /> : index === 3 ? <TaskIcon /> : ''}
                </ListItemIcon>
                <ListItemText primary={e.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {ListAdmin.map((e, index) => (
            <ListItem key={e.label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={e.action}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={e.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>





      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Typography component="span" className={dashboard}>
          <div className='d-flex    '>
            {
              ['Service A', 'Service B', 'Service C'].map((e, i) => {
                return (
                  <MDBCard background='primary' className='text-white mb-3  ms-2  ' key={i}>
                    <MDBCardHeader className='d-flex justify-content-between'> <span>{e}</span>  <span>Icon</span> </MDBCardHeader>
                    <MDBCardBody>
                      <MDBCardTitle>Primary card title</MDBCardTitle>
                      <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                )
              })
            }
          </div>
          <div className='d-flex'>
            <PieShart />
            <BarShart />
          </div>




        </Typography>
        <Typography component="span" className={service.A}>
          <Table service='Service A' />
        </Typography>

        <Typography component="span" className={service.B}>
          Service B
          <Table service='Service B' />
        </Typography>

        <Typography component="span" className={service.C}>
          Service C
          <Table service='Service C' />
        </Typography>

        <Typography component="span" className={paramettre}>
          <div className='p-0 m-0'>
            <TableParam />
          </div>
        </Typography>

        <Typography component="span" className={compte}>
          Compte
          <div>
            <TableEmp />
          </div>
        </Typography>
      </Box>
      {/* // Toas */}
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
    </Box>
  );
}