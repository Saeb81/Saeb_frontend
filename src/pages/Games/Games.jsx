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
import { Grid, Card, CardMedia, CardContent, FormControl, Container, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'
import './Games.css';

function Comments({ comment, username, game_id }) {
    console.log(localStorage.getItem('game_id'))
    if (game_id != localStorage.getItem('game_id')) {
        return;
    }
    return (
        <Typography sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{}}>
                {username} :
            </Typography>
            <Typography>

                {comment}
            </Typography>
        </Typography>
    );
}


export default function Profile() {
    const [data, setData] = useState([]);
    const [game_id, setGameId] = useState(0);
    const [image_base64, setImage_base64] = useState('');
    const [genre, setGenre] = useState('');
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState(0);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [comment, setComment1] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedGameId = localStorage.getItem('game_id');
        setGameId(storedGameId);
        fetchData();
        fetchData1();
        fetchData2();

    }, []);

    useEffect(() => {
        if (data.length > 0 && game_id > 0) {
            setTitle(data[game_id - 1].title);
            setGenre(data[game_id - 1].genre);
            setImage_base64(data[game_id - 1].image_base64);
            setRate(data[game_id - 1].rate);
            setDescription(data[game_id - 1].description);


        }
    }, [data, game_id]);

    const fetchData = async () => {

        try {
            const data1 = await get('/game');
            setData(data1);
        } catch (error) {

        }
    }

    const fetchData1 = async () => {

        try {
            const data1 = await get('/comments');
            setData3(data1);
        } catch (error) {

        }
    }

    const fetchData2 = async () => {

        try {
            const data1 = await get('/users');
            setData4(data1);
        } catch (error) {

        }
    }
    const handleComment = (event) => {
        setComment1(event.target.value)
    }

    const handlecomment1 = async () => {
        const data1 = await get('/comments');
        const comment_id = data1.length + 1;
        const user_id = localStorage.getItem('user_id');
        const username = data4[user_id - 1].username
        console.log(username);
        console.log(data1.length + 1);
        await post('/comments', { username, comment, comment_id, user_id, game_id });
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
        navigate('/Games')
    }

    return <div className='games'>  <Link to="/Home"><Typography sx={{ display: 'flex', color: 'black' }} >MaveShop</Typography></Link>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'inherit', justifyContent: 'center', alignItems: 'center', height: 'Auto' }}>

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
                        <Link to="/Buy" > <Button size="small">Buy</Button></Link>
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
                <Typography sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField onChange={handleComment} sx={{ width: 500 }} label="Write a Comment">
                    </TextField>
                    <Button onClick={handlecomment1}>send</Button>
                </Typography>
                <Container sx={{ border: 'solid black', height: 'auto' }}>
                    {data3.slice().reverse().map((comments, index) => (
                        <Comments
                            key={index}
                            comment={comments.comment}
                            username={comments.username}
                            game_id={comments.game_id}
                        />
                    ))}
                </Container>


                <Stack sx={{ display: alertVisible ? 'flex' : 'none', width: '100%' }} spacing={2}>
                    <Alert sx={{ backgroundColor: 'inherit', color: 'white', border: 'solid black' }} severity="success">check your mail box.</Alert>
                </Stack>


            </Box>
        </Container>
    </div>
}

