import React,{ useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material'
import { Sidebar, Videos } from "../components";
import axios from 'axios';
import { X_RAPID_API_KEY } from '../constants/constants';

const Feed = () => {

  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('New');

  const options = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/search",
    params: {
      q: `${selectedCategory}`,
      part: "snippet,id",
      regionCode: "US",
      maxResults: "50",
      order: "date",
    },
    headers: {
      "X-RapidAPI-Key": X_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios.request(options).then((response) => {
      setVideos(response?.data?.items);
    }).catch((error) => {
      console.error(error);
    })
  },[selectedCategory])

  return (
    <Stack
      sx={{
        flexDirection:{
          sx: 'column',
          md: 'row'
        },
        backgroundColor: '#000',
      }}
    >
      <Box
        sx={{
          height:{
            sx: 'auto',
            md: '92vh'
          },
          borderRight:'1px solid #3d3d3d',
          px:{
            sx: 0,
            md: 2
          }
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography className='copyright' variant="body2" sx={{
          mt: 1.5,
          color: '#fff'
        }} >
          Copyright 2022 © All Rights Reserved
        </Typography>
      </Box>
      <Box p={2} sx={{
        overflowY: 'auto',
        height:"90vh",
        flex: 2
      }} >
        <Typography variant="h4" fontWeight={"bold"} mb={2} sx={{
          color: '#fff',
        }}>
          {selectedCategory} <span
            style={{
              color: '#FC1503',
            }}
          >Videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed