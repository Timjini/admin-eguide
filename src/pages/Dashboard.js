import React, { useEffect, useState } from 'react';
import { HEADERS , API_USER_DATA } from '../constant';
import { useSelector } from'react-redux';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AudioCard from '../components/AudioCard';

export default function Dashboard(props) {
  const user = useSelector(state => state.user); 


  return (
    <div>
      <Container sx={{ m: 5 }}>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div>
              <AudioCard />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
            <AudioCard />
            </div>
          </Grid>
        </Grid>
        </Container>


    </div>
  );
}
