import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Profile() {

    const [gameId, setGameId] = useState(0);
    const [image_base64, setImage_base64] = useState('');
    const [genre, setGenre] = useState('');
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertVisible1, setAlertVisible1] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

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

    const handleRate = (e) => {
        const rate1 = (e.target.value)
        const regex = /^[0-9]+$/;

        if (!regex.test(rate1)) {
            setError(true);
        } else {
            const rate2 = parseInt(rate1, 10);
            if (rate2 < 0 || rate2 > 10) {
                setError(true);
            } else {
                setError(false);
                setRate(rate1);
            }
        }
    }


    const handleGenre = () => {
        setGenre(event.target.value)
    }

    const handleDescription = () => {
        setDescription(event.target.value)
    }

    useEffect(() => {
        fetchData();
    }, [gameId]);

    const fetchData = async () => {
        const data = await get('/game')
        setGameId(data.length + 1);
    }

    const addGame = async () => {
        await fetchData();

        if (error ||title == '' || rate == 0 || genre == '' || description == '') {
            setAlertVisible1(true);
            setTimeout(() => {
                setAlertVisible1(false);
            }, 3000);
        }
        else {
            post('/game', { title, rate, genre, description, gameId })
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
            navigate('/Store')
        }
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

                            <TextField onChange={handleRate} id="input-with-sx" label="rate" variant="standard" error={error}
                                helperText={error ? 'Rate must be a number between 0 and 10' : ''} />
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
                <Link to='/AddGames'>  <Button sx={{ border: 'solid black', height: 50, width: 100 }}> cancel</Button></Link>
                <Stack sx={{ display: alertVisible ? 'flex' : 'none', width: '100%' }} spacing={2}>
                    <Alert sx={{ backgroundColor: 'inherit', color: 'white', border: 'solid black' }} severity="success">Game Is Added</Alert>
                </Stack>
                <Stack sx={{ display: alertVisible1 ? 'flex' : 'none', width: '100%' }} spacing={2}>
                    <Alert sx={{ backgroundColor: 'inherit', color: 'white', border: 'solid black' }} severity="error">Incorrect Inputs</Alert>
                </Stack>
            </Box>
        </Container>
    </div>
}

