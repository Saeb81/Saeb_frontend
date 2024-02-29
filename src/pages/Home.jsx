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
import { Grid, Card, CardMedia, CardContent, Container, FormControl, FormLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import './Home.css';
import { Link } from 'react-router-dom';

import { get } from '../utils/httpClient'
import { post } from '../utils/httpClient'
import { useNavigate } from 'react-router-dom';

// const data = await get('/game')

function renderMenu() {
  const menuId = 'primary-search-account-menu';
  return (
   
      <Container sx={{ display: 'flex', flexDirection: 'column', padding: '15%' }}>
        <Link to="/Profile"><MenuItem>Profile</MenuItem></Link>

        <Link to="/"> <MenuItem>SignOut</MenuItem> </Link>
      </Container>
  );
}

function renderMobileMenu() {
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <div></div>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function PrimarySearchAppBar() {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  //   React.useState<null | HTMLElement>(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');

  const [userId, setUserId] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const [height, setHeight] = useState(50)

  const [game1, setGame1] = useState('')
  const [game2, setGame2] = useState('')
  const [game3, setGame3] = useState('')
  const [gameId1, setGameId1] = useState('')
  const [gameId2, setGameId2] = useState('')
  const [gameId3, setGameId3] = useState('')
  const [gameId4, setGameId4] = useState('')
  const [gameId5, setGameId5] = useState('')
  const [title1, setTitle1] = useState('')
  const [title2, setTitle2] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data1 = await get(`/game`);

      setImage1(data1[data1.length - 1].image_base64)
      setTitle1(data1[data1.length - 1].title)
      setImage2(data1[data1.length - 2].image_base64)
      setTitle2(data1[data1.length - 2].title)
      setGameId4(data1[data1.length - 1].id)
      setGameId5(data1[data1.length - 2].id)
      console.log(data1);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  useEffect(() => {
    console.log(title1);
    console.log(title2);
  }, [title1, title2, image1, image2, gameId4, gameId5]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    console.log(storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {

    isAdmin();
  }, [userId]);

  const isAdmin = async () => {
    let i = 0;
    const data = await get('/users')

    while (i < data.length) {

      if (data[i].user_id == userId) {
        console.log(data[i - 1].admin)
        if (data[i - 1].admin) {
          setAlertVisible(true);
        }
      }
      i++;
    }
  }
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleProfileMenuOpen = (event) => {
    renderMenu();
    renderMobileMenu();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setGame1("");
    setGame2("");
    setGame3("");
    setGameId1("");
    setGameId2("");
    setGameId3("");

    getGames();
  }
  const navigate = useNavigate();

  const handlegame1 = () => {
    localStorage.setItem('game_id', gameId1);

    navigate('/Games');
  }

  const handlegame2 = () => {
    localStorage.setItem('game_id', gameId2);

    navigate('/Games');
  }

  const handlegame3 = () => {
    localStorage.setItem('game_id', gameId3);

    navigate('/Games');
  }

  const handlegame4 = () => {
    console.log("-------------")
    localStorage.setItem('game_id', gameId4);
  }

  const handlegame5 = () => {
    console.log("-------------")
    localStorage.setItem('game_id', gameId5);
  }



  const getGames = async () => {
    setHeight(50);

    if (search != '') {
      setHeight(50);

      const data2 = await get(`/title?search=${search}`);

      let i = 0;
      while (i < 3 && i < data2.length) {

        setHeight(150);


        if (i == 0) {
          setGame1(data2[0].title)
          setGameId1(data2[0].id)
        }
        if (i == 1) {
          setGame2(data2[1].title)
          setGameId2(data2[1].id)
        }
        if (i == 2) {
          setGame3(data2[2].title)
          setGameId3(data2[2].id)
        }
        i++;
      }
    }
  }

  return (
    <div className='home' >
      <Search sx={{ backgroundColor: 'darkslategray', height: height, display: 'flex', flexDirection: 'column' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase sx={{}} onChange={handleSearch} onClick={handleSearch}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button onClick={handlegame1}> {game1}</Button>
        <Button onClick={handlegame2}> {game2}</Button>
        <Button onClick={handlegame3}> {game3}</Button>
      </Search>


      <Box sx={{ display: 'flex', flexGrow: 1, }}>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', backgroundColor: 'black', }}>
            <Container>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <Link to="/Home"><Typography sx={{ display: 'flex', color: 'white' }} >MaveShop</Typography></Link>
              </Typography>

            </Container>

            <Container sx={{ maxWidth: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

              <Link to="/Store"><Typography sx={{ display: 'flex', color: 'white' }} >Store</Typography></Link>
              <Link to="/Library"><Typography sx={{ display: 'flex', color: 'white' }} >Library</Typography></Link>
              <Link to="/AddGames"><Typography sx={{ display: alertVisible ? 'flex' : 'none', color: 'white' }} >Edit Games</Typography></Link>

            </Container>



            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex', } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>




      <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, marginTop: 5 }}>
        <Card sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 310, height: 1000,
          border: 'groove', backgroundColor: 'inherit'
        }}>
          <CardMedia
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5%', height: 200, width: 300 }}
            image={image1}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title1}
            </Typography>

          </CardContent>
          <CardActions>
            <Link to="/Buy" > <Button onClick={handlegame4} size="small">Buy</Button></Link>
            <Link to="/Games">  <Button onClick={handlegame4} size="small">Read More</Button></Link>
          </CardActions>
        </Card>
      </FormControl>
      <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, marginTop: 5 }}>
        <Card sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 310, height: 1000,
          border: 'groove', backgroundColor: 'inherit'
        }}>
          <CardMedia
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5%', height: 200, width: 300 }}
            image={image2}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title2}
            </Typography>

          </CardContent>
          <CardActions>
            <Link to="/Buy" >   <Button onClick={handlegame5} size="small">Buy</Button></Link>
            <Link to="/Games">  <Button onClick={handlegame5} size="small">Read More</Button></Link>
          </CardActions>
        </Card>
      </FormControl>
    </div>
  );
}
