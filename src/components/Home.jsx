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
      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        sequi ut hic voluptatibus quisquam deleniti sapiente libero maiores
        minima eius suscipit saepe enim in dolores, aspernatur sed qui quos. Sed
        reiciendis quam assumenda eos natus necessitatibus, quae deserunt dolore
        nihil, beatae possimus blanditiis quas facere at harum a. Fugit, labore.
      </Typography>
      <br />
      <Container className={classes.container}>
        <ButtonGroup>
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
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default Home;
