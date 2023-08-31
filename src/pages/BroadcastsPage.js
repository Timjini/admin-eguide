import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AudioCard from '../components/AudioCard';


export default function BroadcastPage(){
    return (
        <Container sx={{marginTop:10}}>
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
    )
}