import './Sign.css';
import { Container, Typography } from '@mui/material';
import * as React from 'react';
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { get } from '../../utils/httpClient'
import { post } from '../../utils/httpClient'

import { useNavigate } from 'react-router-dom';


export default function Sign() {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(false);

    let text1 = "Please Fill"
    let text2 = "All The Fields"
    let text3 = "Already Exist"
    let text4 = "This Username"


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const linkStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertVisible1, setAlertVisible1] = useState(false);
    const [alertVisible2, setAlertVisible2] = useState(false);

    const loadUser = async () => {
        const data = await get('/users')
        setUser(data);
    }
    useEffect(() => {
        loadUser()
    }, [user])


    const failed = () => {
        setAlertVisible(false);
        setAlertVisible1(false);
        setAlertVisible2(false);
    }

    const handleUserName = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleAge = (e) => {
        const inputAge = e.target.value;
        const regex = /^[0-9]+$/;

        if (!regex.test(inputAge)) {

            setError(true);
        } else {
            const age = parseInt(inputAge, 10);
            if (age < 5 || age > 99) {
                setError(true);
            } else {
                setError(false);
                setAge(inputAge);
            }
        }
    }

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 200,
        height: 200,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
    }));

    const navigate = useNavigate()

    const handleSign = async () => {
        let i = 0;
        if (username === "" || password === "" || email === "" || age === "") {
            setAlertVisible(true)
            setAlertVisible1(true)
            return;
        }

        while (i < user.length) {
            console.log("batman")
            if (user[i].username === username) {
                setAlertVisible(true)
                setAlertVisible2(true)
                break;

            }

            i++;
        }
        if (!error && i >= user.length) {
            const user_id = user.length + 1;
            post('/users', { username, email, password, age, user_id })
            localStorage.setItem('user_id', user_id);
            navigate('/Home')
        }


    };


    return (
        <div className='page'>
            <div className="body" >
                <Container sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: 5 }} > Sign</Typography>
                    <div>
                        <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, width: '25ch', alignItems: 'flex-end' }}>
                            <Box display={'flex'}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="UserName" variant="standard" onChange={handleUserName} />
                            </Box>
                            <FormControl sx={{ m: 1, width: '22ch', marginRight: '-5px' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input onChange={handlePassword}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
                                    <TextField onChange={handleAge} sx={{ width: '22ch' }}
                                        // error
                                        id="standard-error"
                                        label="Age"
                                        variant="standard"
                                        error={error}
                                        helperText={error ? 'Age must be a number between 5 and 99' : ''}
                                    />
                                    <TextField onChange={handleEmail} sx={{ width: '22ch' }}
                                        // error
                                        id="standard-error"
                                        label="Email"
                                        variant="standard"
                                    />
                                </FormControl>
                            </FormControl>
                        </Box>
                        <Container sx={{
                            display: alertVisible ? 'flex' : 'none',
                            justifyContent: 'center',
                            borderRadius: '5px',
                            position: 'absolute',
                            top: '55%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',

                        }}>
                            <DemoPaper variant="elevation">
                                <Container sx={{

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '5px',
                                    border: 'solid beige',

                                }}>

                                    <InputLabel htmlFor="standard-adornment-password" sx={{
                                        display: alertVisible1 ? 'flex' : 'none', justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {text1}
                                    </InputLabel>
                                    <InputLabel htmlFor="standard-adornment-password" sx={{
                                        display: alertVisible1 ? 'flex' : 'none', justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {text2}
                                    </InputLabel>

                                    <InputLabel htmlFor="standard-adornment-password" sx={{
                                        display: alertVisible2 ? 'flex' : 'none', justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {text3}
                                    </InputLabel>
                                    <InputLabel htmlFor="standard-adornment-password" sx={{
                                        display: alertVisible2 ? 'flex' : 'none', justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {text4}
                                    </InputLabel>

                                </Container>

                                <Button sx={{ m: 3 }} onClick={failed} >OK</Button></DemoPaper>
                        </Container>
                    </div>

                    <Link to="/" style={linkStyle}><div className='in'>Already Having an Account?Login</div></Link>
                    <div className='sign-btn ' onClick={handleSign}>Sign in</div>

                </Container>
            </div>
        </div>
    );
};



