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
import { Grid, Card, CardContent, Container, FormControl, Input, FormLabel } from '@mui/material';
import { CardMedia } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';

function GameCard({ base64, title, id }) {


  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem('game_id', id);
    navigate('/Edit');
  };
  return (
    <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, marginTop: 5 }}>
      <Card sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 310, height: 1000,
        border: 'groove', backgroundColor: 'inherit'
      }}>
        <CardMedia
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5%', height: 200, width: 300 }}
          image={base64}
          title="Game Image"
          component='img'
        />
        <CardContent>
          <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
            {title}
          </Typography>

        </CardContent>
        <CardActions>

          <Button onClick={handleClick} size="small">Edit</Button>

        </CardActions>
      </Card>
    </FormControl>
  );
}


export default function Library() {
  let storedUserId = 0;


  const fetchData = async () => {
    try {
      const data = await get(`/game`);
      setUserGames(data);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  useEffect(() => {
    storedUserId = localStorage.getItem('user_id');
    fetchData();
  }, []);

  // useEffect(() => {

  //       GameCard(data1[storedUserId-1].image_base64,data1[storedUserId-1].title,data1[storedUserId-1].description);
  // }, [])

  const [userGames, setUserGames] = useState([]);


  return <div className='store'>
   <Link to="/Home"><Typography sx={{ display: 'flex', color: 'white' }} >MaveShop</Typography></Link>
    <Button sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'Black' }}>      <Link to="/Add" >   Add Game </Link></Button>

    <FormLabel sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}> Games List</FormLabel>

    <List sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'inherit', justifyContent: 'center', alignItems: 'center' }} aria-label="mailbox folders">
      <ListItem sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        {userGames.slice().reverse().map((game, index) => (
          <GameCard
            key={index}
            base64={game.image_base64}
            title={game.title}
            id={game.id}
          />
        ))}
      </ListItem>

    </List>
  </div>
}

