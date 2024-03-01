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
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'
import { useNavigate } from 'react-router-dom';




export default function Profile() {

    const [gameId, setGameId] = useState(0);
    const [image_base64, setImage_base64] = useState('');
    const [genre, setGenre] = useState('');
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const navigate = useNavigate();
    // const [image, setImage] = useState(null);


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            convertToBase64(file);
        }
    };


    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            convertToBase64(file);
        }
    };


    const preventDefaultAction = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };


    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result;
            setImage_base64(base64String);
        };
        reader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
        };
    };


    const handleTitle = (event) => {
        setTitle(event.target.value)
        fetchData();
    }


    const handleRate = () => {
        setRate(event.target.value)
    }


    const handleGenre = () => {
        setGenre(event.target.value)
    }

    const handleDescription = () => {
        setDescription(event.target.value)

    }

    useEffect(() => {

        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await get('/game')
        setGameId(data.length + 1);
        console.log("---------------------");
        console.log(gameId);
        console.log("---------------------");
    }

    const addGame = async () => {
        console.log(title);
        console.log(rate);
        console.log(image_base64);
        console.log(genre);
        console.log(gameId);
        console.log(description);
        await fetchData();
        setAlertVisible(true);
        post('/game', { title, rate, genre, description, gameId })
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
        navigate('/Store')
    }



    return <div className='games'>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'inherit', justifyContent: 'center', alignItems: 'center', height: '720px' }}>
                <Card sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 310, height: 400,
                    border: 'groove', backgroundColor: 'inherit'
                }}>
                    <Typography className="App" onDrop={handleDrop} onDragOver={preventDefaultAction}>

                        <input type="file" accept="image/*" onChange={handleFileInputChange} />
                        {image_base64 && (
                            <Typography variant="body1" component="pre" style={{ width: '100%', maxHeight: '100px', overflowY: 'auto' }}>
                            </Typography>
                        )}
                    </Typography>

                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">

                            <TextField onChange={handleTitle} id="input-with-sx" label="title" variant="standard" />
                        </Typography>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">

                            <TextField onChange={handleRate} id="input-with-sx" label="rate" variant="standard" />
                        </Typography>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            <TextField onChange={handleGenre} id="input-with-sx" label="genre" variant="standard" />
                        </Typography>
                    </CardContent>
                    <Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} variant='h4'>
                        Description
                        <TextField onChange={handleDescription} id="input-with-sx" label="" variant="standard" />
                    </Typography>
                </Card>
                <Button onClick={addGame} sx={{ border: 'solid black', height: 50, width: 100 }}> Add</Button>
                <Link to='/Home'>  <Button sx={{ border: 'solid black', height: 50, width: 100 }}> cancel</Button></Link>
                <Stack sx={{ display: alertVisible ? 'flex' : 'none', width: '100%' }} spacing={2}>
                    <Alert sx={{ backgroundColor: 'inherit', color: 'white', border: 'solid black' }} severity="success">check your mail box.</Alert>
                </Stack>
            </Box>
        </Container>
    </div>
}

