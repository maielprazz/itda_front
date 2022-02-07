import React from 'react';
import { Typography, Button, ButtonGroup, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Home = () => {
  const useStyles = makeStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
  });
  console.log('home mounted');
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">Welcome to MAA Data Analytics Portal</Typography>

      <br />
      <Container className={classes.container}>
        {/* <ButtonGroup>
          <Button variant="contained" color="primary">
            Our Team
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="mailto:ismail.prasetyo@map.co.id"
          >
            Contact Us
          </Button>
        </ButtonGroup> */}
      </Container>
    </div>
  );
};

export default Home;
