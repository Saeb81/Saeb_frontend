import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'
import './Profile.css';

export default function Profile() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [alertVisible, setAlertVisible] = useState(true);
  const [alertVisible1, setAlertVisible1] = useState(false);
  const [user, setUser] = useState({});


  useEffect(() => {
    profile();
  }, [user]);

  const profile = async () => {
    try {
      const data = await get('/users');
      const userId = localStorage.getItem('user_id');
      setUser(data[userId - 1]);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
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
    <Link to="/Home"><Typography sx={{ display: 'flex', color: 'white' }} >MaveShop</Typography></Link>
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
      <Container>
        <List sx={{ display: alertVisible ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <TextField
            disabled
            id="standard-disabled"
            label=""
            value={user.username}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label=""
            value={user.password}
            variant="standard"
          />
          <TextField
            disabled
            id="standard-disabled"
            label=""
            value={user.email}
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

