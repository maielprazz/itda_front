import React, { Suspense, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, lightBlue } from '@mui/material/colors';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import { AppContext } from './context/AppContext.js';
import Layout from '../src/components/Layout.jsx';
import Loading from './components/Loading.jsx';
import Login from './pages/Login.jsx';
import '../public/analytics.png';
import { logout } from './actions/userActions';

const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  const [expandOpen, setExpandOpen] = useState(true);

  // const [drawmenu, setDrawmenu] = useState([]);
  const [accToken, setAccToken] = useState(
    localStorage.getItem('ITDAacctoken')
      ? JSON.parse(localStorage.getItem('ITDAacctoken'))
      : null
  );
  const [refToken, setRefToken] = useState(
    localStorage.getItem('ITDAreftoken')
      ? JSON.parse(localStorage.getItem('ITDAreftoken'))
      : null
  );
  const [user, setUser] = useState(
    accToken ? jwt_decode(accToken).username : null
  );

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      dispatch(logout());
    }
  }, [user]);

  // console.log('decoded user', user);

  const contextData = {
    accToken,
    setAccToken,
    refToken,
    setRefToken,
    expandOpen,
    setExpandOpen,
    user,
    setUser,
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<Loading />}>
          <AppContext.Provider value={contextData}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={(props) => <Layout {...props} />}
              />
            </Switch>
          </AppContext.Provider>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
