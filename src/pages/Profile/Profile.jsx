import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { blue } from '@mui/material/colors';
import { Grid, Card, CardMedia, CardContent, Container } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import { Link } from 'react-router-dom';

import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'

import './Profile.css';
const data = await get('/users')


export default function Profile() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [alertVisible, setAlertVisible] = useState(true);
  const [alertVisible1, setAlertVisible1] = useState(false);
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    profile();
    console.log("--------------");
    console.log(userName);
  }, []);
  const profile = async () => {
    let i = 0;
    const data = await get('/users')
    console.log(data);
    console.log(localStorage.getItem('user_id') - 1)
    console.log(data[localStorage.getItem('user_id') - 1].username);
    setUsername(data[localStorage.getItem('user_id') - 1].userName)
    setPassword(data[localStorage.getItem('user_id') - 1].password)
    setEmail(data[localStorage.getItem('user_id') - 1].email)
    console.log(userName);
  }

  const handleAccount = () => {
    setAlertVisible(true);
    setAlertVisible1(false);
  }
  const handleSetting = () => {
    setAlertVisible(false);
    setAlertVisible1(true);
  }

  const handleUpdate = () => {
    setAlertVisible(true);
    setAlertVisible1(false);
  }
  const handleTwoStep = () => {
    setAlertVisible(false);
    setAlertVisible1(true);
  }

  return <div className='setting'>
    <List sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'inherit', borderRadius: 5, justifyContent: 'space-evenly', height: 1080 }}>

      <List sx={{
        display: 'flex', flexDirection: 'column', backgroundColor: 'black', borderRadius: 5, height: 'fit-content'
      }} aria-label="mailbox folders">
        <ListItem>
          <Button onClick={handleAccount}> Account</Button>

        </ListItem>
        <Divider component="li" />
        <ListItem>
          <Button onClick={handleSetting}>Setting </Button>
        </ListItem>
        <Divider component="" />

        <Divider component="li" />

      </List>
      <Container sx={{}}>
        <List sx={{ display: alertVisible ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue=  {data[localStorage.getItem('user_id') - 1].username}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue={data[localStorage.getItem('user_id') - 1].password}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue={data[localStorage.getItem('user_id') - 1].email}
            variant="standard"
          />

        </List>

        <List sx={{ display: alertVisible1 ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <List sx={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox onChange={handleUpdate} {...label} />
            <Button>
            AutoUpdate
           </Button>
          </List>
          <List sx={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox onChange={handleTwoStep} {...label} />
           <Button>
            Two Step Verfication
           </Button>
          </List>


        </List>
      </Container>


    </List>
  </div>
}

