import React, { useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { format } from 'date-fns';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Content from './Content.jsx';
import logo from '../assets/images/MAP-AKTIF.png';
import { logout } from '../actions/userActions';
import { AppContext } from '../context/AppContext.js';
import { daysToWeeks } from 'date-fns/esm';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
  },
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
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  // overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Layout() {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [expandset, setExpandSetting] = useState({});
  const [drawmenu, setDrawmenu] = useState([]);

  const {
    accToken,
    setAccToken,
    refToken,
    setRefToken,
    expandOpen,
    setExpandOpen,
    user,
    setUser,
  } = useContext(AppContext);

  console.log('layout, app history', history);

  useEffect(() => {
    setAccToken(
      localStorage.getItem('ITDAacctoken')
        ? JSON.parse(localStorage.getItem('ITDAacctoken'))
        : null
    );
    setUser(accToken ? jwt_decode(accToken).username : null);

    let expToken = accToken ? jwt_decode(accToken).exp : dayjs.unix(dayjs());
    let user = accToken ? jwt_decode(accToken).username : null;

    if (dayjs.unix(expToken).diff(dayjs()) < 1) {
      console.log('expired');
      history.push('/login');
    }
    console.log('set user new', user);

    if (!user) {
      console.log('must login');
      history.push('/login');
    }
  }, [accToken, history, user]);

  console.log('our new user', user);

  useEffect(() => {
    setDrawmenu(
      localStorage.getItem('ITDAmenu')
        ? JSON.parse(localStorage.getItem('ITDAmenu'))
        : []
    );
    let dwmenu = JSON.parse(localStorage.getItem('ITDAmenu'));

    const oriexpandset = localStorage.getItem('ITDAmenu')
      ? Object.assign({
          settings: Array.from(
            dwmenu.map((menu) => ({ id: menu.id, open: false }))
          ),
        })
      : [];

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

  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setExpandOpen(true);
  };
  const handleDrawerClose = () => {
    setExpandOpen(false);
  };
  const handleLogout = () => {
    console.log('logout from button');
    dispatch(logout());
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} open={expandOpen}>
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
            Hi, {<span className={classes.capitalizeText}>{user}</span>}
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
      {/* Drawer */}
      <Drawer variant="permanent" open={expandOpen}>
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
              <Tooltip title={val.text}>
                <ListItemIcon>
                  <i className={`MuiSvgIcon-root ` + val.icon}></i>
                </ListItemIcon>
              </Tooltip>
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
                    sx={{ pl: 4, background: '#a4a4a4' }}
                    className={classes.active}
                    key={subidx}
                    onClick={() => history.push(subval.path)}
                  >
                    <Tooltip title={subval.text}>
                      <ListItemIcon>
                        <i className={`MuiSvgIcon-root ` + subval.icon}></i>
                      </ListItemIcon>
                    </Tooltip>
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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </main>
    </div>
  );
}
