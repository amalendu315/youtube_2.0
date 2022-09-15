import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import axios from 'axios'
import { X_RAPID_API_KEY } from '../constants/constants'
import { Videos, ChannelCard } from "./"


const ChannelDetail = () => {
  const { id } = useParams()
  const [channelDetails, setChannelDetails] = useState(null)
  const [videos, setVideos] = useState([])

  const optionsChannel = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/channels",
    params: { part: "snippet,statistics", id: `${id}` },
    headers: {
      "X-RapidAPI-Key": X_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  const optionsVideos = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/search",
    params: {
      channelId: `${id}`,
      part: "snippet,id",
      order: "date",
      maxResults: "50",
    },
    headers: {
      "X-RapidAPI-Key": X_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(optionsChannel)
      .then((response) => {
        setChannelDetails(response.data.items[0])
      })
      .catch((error) => {
        console.error(error);
      });
      axios.request(optionsVideos).then((response) => {
        setVideos(response?.data?.items);
      }).catch((error) => {
        console.error(error);
      })
  },[id])

  return (
    <Box
      minHeight="95vh"
      sx={{
        backgroundColor: '#000',
      }}
    >
      <Box>
        <div 
          style={{
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetails} marginTop="-110px" />
      </Box>
      <Box display={"flex"} p="2" >
        <Box
          sx={{
            mr:{
              sm:'100px'
            }
          }}
        />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail