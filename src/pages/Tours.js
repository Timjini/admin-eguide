import React, { useEffect, useState } from 'react';
import { HEADERS , API_USER_DATA } from '../constant';
import { useSelector } from'react-redux';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ReviewCard from '../components/ReviewCard';

export default function Tours(props) {
  const user = useSelector(state => state.user); 


  return (
    <div>
      <ReviewCard />
    </div>
  );
}
