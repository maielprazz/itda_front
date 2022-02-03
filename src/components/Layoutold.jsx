import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { format } from 'date-fns';
import { makeStyles, useTheme } from '@mui/styles';
import { Drawer, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { DefaultContext } from '../context/DefaultContext';
// import drawerItems from '../assets/data/drawer_menu.json';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Content from './Content.jsx';
import logo from '../assets/images/MAP-AKTIF.png';
import { logout } from '../actions/userActions';
// import Avatar from '@mui/material/Avatar';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(2),
  },
  logout: {
    marginLeft: theme.spacing(1),
  },
  date: {
    flexGrow: 1,
  },
  rootNestedList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  capitalizeText: {
    textTransform: 'capitalize',
  },
  companyLogo: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
  darkToggle: {
    position: 'relative',
    justifyContent: 'center',
    paddingRight: theme.spacing(2),
  },
  active: {
    background: '#a4a4a4',
  },
  logo: {
    maxWidth: 80,
    maxHeight: 64,
    marginRight: theme.spacing(4),
  },
}));

function Layout() {
  const {
    user,
    setUser,
    expandOpen,
    setExpandOpen,
    loading,
    setLoading,
    drawmenu,
    setDrawmenu,
  } = useContext(DefaultContext);

  console.log('default ', expandOpen);
  console.log('drawmenu', drawmenu);

  // const userLogin = useSelector((state) => state.userLogin);
  // const { username, drawerItems } = userLogin;

  const classes = useStyles();
  const theme = useTheme();

  // const [expandopen, setExpandOpen] = useState(true);
  // const [username, setUsername] = useState('');
  // const [checked, setChecked] = useState(false);

  const history = useHistory();
  const location = useLocation();

  // const handleTheme = () => {
  //   setChecked((prev) => !prev);
  // };
  const handleLogout = () => {
    dispatch(logout());
  };

  const [expandset, setExpandSetting] = useState({});

  useEffect(() => {
    setDrawmenu(
      localStorage.getItem('ITDAmenu')
        ? JSON.parse(localStorage.getItem('ITDAmenu'))
        : []
    );

    setUser(
      localStorage.getItem('ITDAusr')
        ? JSON.parse(localStorage.getItem('ITDAusr'))
        : 'Guest'
    );

    let drawmenu = JSON.parse(localStorage.getItem('ITDAmenu'));
    const oriexpandset = Object.assign({
      settings: Array.from(
        drawmenu.map((menu) => ({ id: menu.id, open: false }))
      ),
    });
    setExpandSetting(oriexpandset);
  }, []);

  const handleListClick = (idx) => {
    setExpandSetting((expandset) => ({
      ...expandset,
      settings: expandset.settings.map((item) =>
        item.id === idx ? { ...item, open: !item.open } : item
      ),
    }));
  };

  // console.log(expandset.settings);
  const handleDrawerOpen = (e) => {
    e.preventDefault;
    setExpandOpen(false);
    console.log(expandOpen);
  };

  const handleDrawerClose = (e) => {
    e.preventDefault;
    setExpandOpen(false);
    console.log(expandOpen);
  };

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* App bar */}
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: expandOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: expandOpen,
            })}
          >
            <Tooltip title="Show Menu">
              <MenuIcon />
            </Tooltip>
          </IconButton>
          <Typography className={classes.date}>
            {format(new Date(), 'do MMM Y')}
          </Typography>
          <Typography>
            Hi,{' '}
            {
              <span className={classes.capitalizeText}>
                {user.toString().replace('.', ' ')}
              </span>
            }
          </Typography>{' '}
          {user ? (
            <Button
              className={classes.logout}
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              className={classes.logout}
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Side drawer */}

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: expandOpen,
          [classes.drawerClose]: !expandOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: expandOpen,
            [classes.drawerClose]: !expandOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img
            src={logo}
            alt="MAP AKTIF LOGO"
            className={classes.logo}
            onClick={() => history.push('/home')}
          />
          <Tooltip title="Hide Menu">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>

        <Divider />

        {drawmenu.map((val) => (
          <List
            key={val.id}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.rootNestedList}
          >
            <ListItemButton
              onClick={() => {
                handleListClick(val.id);
              }}
            >
              <ListItemIcon>
                <i className={`MuiSvgIcon-root ` + val.icon}></i>
              </ListItemIcon>
              <ListItemText
                className={classes.capitalizeText}
                primary={val.text}
              />
              {expandset.settings.find((item) => item.id === val.id).open ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>
            <Collapse
              in={expandset.settings.find((item) => item.id === val.id).open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {val.submenu.map((subval, subidx) => (
                  <ListItemButton
                    className={`
                    ${classes.nested} ${
                      location.pathname === subval.path ? classes.active : null
                    }
                    `}
                    key={subidx}
                    onClick={() => history.push(subval.path)}
                  >
                    <ListItemIcon>
                      <i className={`MuiSvgIcon-root ` + subval.icon}></i>
                    </ListItemIcon>
                    <ListItemText
                      className={classes.capitalizeText}
                      primary={subval.text}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
        <Divider />
        {/* <FormControlLabel
          control={<Switch checked={checked} onChange={handleTheme} />}
          label="Dark Mode"
        /> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </main>
    </div>
  );
}

export default Layout;
