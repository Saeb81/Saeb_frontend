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
import { Grid, Card, CardMedia, CardContent, FormControl, Container } from '@mui/material';
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





export default function Profile() {
    const [data, setData] = useState([]);
    const [gameId, setGameId] = useState(0);
    const [image_base64, setImage_base64] = useState('');
    const [genre, setGenre] = useState('');
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState(0);


    useEffect(() => {

        const storedGameId = localStorage.getItem('game_id');

        setGameId(storedGameId);

        fetchData();


    }, []);

    useEffect(() => {
        if (data.length > 0 && gameId > 0) {
            setTitle(data[gameId - 1].title);
            setGenre(data[gameId - 1].genre);
            setImage_base64(data[gameId - 1].image_base64);
            setRate(data[gameId - 1].rate);
            setDescription(data[gameId - 1].description);


        }
    }, [data, gameId]);

    const fetchData = async () => {

        try {
            const data1 = await get('/game');
            setData(data1);
        } catch (error) {

        }
    }


    return <div className='games'>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'inherit', justifyContent: 'center', alignItems: 'center', height: '720px' }}>

                <Card sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 310, height: 400,
                    border: 'groove', backgroundColor: 'inherit'
                }}>
                    <CardMedia
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 200, width: 300 }}
                        image={image_base64}
                        title="Game Image"
                        component='img'
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            {title}

                        </Typography>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            rate : {rate}/10
                        </Typography>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            {genre}
                        </Typography>

                    </CardContent>
                    <CardActions>


                    </CardActions>
                </Card>

                <Typography sx={{ marginTop: 10 }} variant='h4'>
                    Description
                </Typography>
                <Typography color={'#1976d2'} gutterBottom variant="h6" component="div">

                    {description}
                </Typography>
            </Box>
        </Container>
    </div>
}

