import React, { Suspense, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter as Router,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Home from './Home.jsx';
import Loading from './Loading.jsx';
import ServerList from './ServerList.jsx';
import Storemaster from './Storemaster.jsx';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Developed by '}
      <Link color="inherit" to="http://jkthomaasql03/">
        IT MAA Data Analytics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function Content() {
  const classes = useStyles();

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* <Route
            exact
            path="/home"
            name="Home"
            render={(props) => <Home {...props} />}
          />*/}
        <Route
          path="/storemaster"
          name="Storemaster"
          render={(props) => <Storemaster {...props} />}
        />

        <Route
          exact
          path="/serverlist"
          name="Server List"
          render={(props) => <ServerList {...props} />}
        />

        <Route
          exact
          path="/"
          name="Landing"
          render={(props) => <Home {...props} />}
        />
      </Switch>
      <div className={classes.toolbar}>
        <div className={classes.footer}>
          <Container>
            <Copyright />
          </Container>
        </div>
      </div>
    </Suspense>
  );
}

export default Content;
