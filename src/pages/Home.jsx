import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Card, CardMedia, CardContent, Container, FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './Home.css';
import { Link } from 'react-router-dom';
import { get } from '../utils/httpClient'
import { useNavigate } from 'react-router-dom';

function GameCard({ base64, title, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem('game_id', id);
    navigate('/Games');
  };
  const handleClick1 = () => {
    localStorage.setItem('game_id', id);
    navigate('/Buy');
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
          <Button onClick={handleClick1} size="small">Buy</Button>

          <Button onClick={handleClick} size="small">Read More</Button>

        </CardActions>
      </Card>
    </FormControl>
  );
}

function SearchCard({ base64, title, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem('game_id', id);
    navigate('/Games');
  };

  return (
    <Button onClick={handleClick}> {title}</Button>
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
  const [search, setSearch] = useState('');
  const [height, setHeight] = useState(50)
  const [userId, setUserId] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [game, setGame] = useState([])
  const [searchGame, setSearchGame] = useState([])
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await get(`/game`);
      setGame(data);

    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };


  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  useEffect(() => {
    isAdmin();
  }, [userId]);

  const isAdmin = async () => {
    let i = 0;
    const data = await get('/users')
    while (i < data.length) {
      if (data[i].user_id == userId) {
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

  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    getGames();
  }

  const getGames = async () => {
    setHeight(50);
    if (search != '') {
      const data1 = await get(`/title?search=${search}`);
      setSearchGame(data1);
      setHeight(150);
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
        {searchGame.slice().reverse().map((game, index) => (
          <SearchCard
            key={3}
            title={game.title}
            base64={game.image_base64}
            id={game.id}
          />
        ))}

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
              <Link to="/Profile"><Typography sx={{ display: 'flex', color: 'white' }} >Profile</Typography></Link>
              <Link to="/"> <Typography sx={{ display: 'flex', color: 'white' }} >SignOut</Typography> </Link>

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
      </Box>
      {game.slice().reverse().map((game, index) => (
        <GameCard
          key={2}
          base64={game.image_base64}
          title={game.title}
          id={game.id}
        />
      ))}
    </div>
  );
}
