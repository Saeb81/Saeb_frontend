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
    const [game, setGame] = useState({});
    const [game_id, setGameId] = useState(0);
    const [user_id, setUserId] = useState(0);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [comment, setComment1] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [game, comments, user, game_id]);

    const fetchData = async () => {
        try {
            const storedGameId = localStorage.getItem('game_id');
            const storedUserId = localStorage.getItem('user_id');
            setGameId(storedGameId);
            setUserId(storedUserId);
            const data1 = await get('/game');
            setGame(data1[storedGameId - 1]);
            const data2 = await get('/comments');
            setComments(data2);
            const data5 = await get('/users');
            setUser(data5[storedUserId-1]);
        } catch (error) {

        }
    }

    const handleComment = (event) => {
        setComment1(event.target.value)
    }

    const handlecomment1 = async () => {
       
        const comment_id = comments.length + 1;
        const username = user.username
        await post('/comments', { username, comment, comment_id, user_id, game_id });
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
                        image={game.image_base64}
                        title="Game Image"
                        component='img'
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            {game.title}
                        </Typography>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            rate : {game.rate}/10
                        </Typography>
                        <Typography color={'#1976d2'} gutterBottom variant="h5" component="div">
                            {game.genre}
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

                    {game.description}
                </Typography>
                <Typography sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField onChange={handleComment} sx={{ width: 500 }} label="Write a Comment">
                    </TextField>
                    <Button onClick={handlecomment1}>send</Button>
                </Typography>
                <Container sx={{ border: 'solid black', height: 'auto' }}>
                    {comments.slice().reverse().map((comments, index) => (
                        <Comments
                            key={index}
                            comment={comments.comment}
                            username={comments.username}
                            game_id={comments.game_id}
                        />
                    ))}
                </Container>
            </Box>
        </Container>
    </div>
}

