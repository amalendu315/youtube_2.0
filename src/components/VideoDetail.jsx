import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { X_RAPID_API_KEY } from "../constants/constants";
import axios from "axios";

const VideoDetail = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const { id } = useParams();
  const optionsVideo = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/videos",
    params: { part: "contentDetails,snippet,statistics", id: id },
    headers: {
      "X-RapidAPI-Key": X_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  const optionsRelated = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/search",
    params: {
      part: "snippet",
      relatedToVideoId: id,
      maxResults: "50",
      type: "video",
    },
    headers: {
      "X-RapidAPI-Key": X_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(optionsVideo)
      .then((response) => {
        setVideo(response.data.items[0]);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .request(optionsRelated)
      .then((response) => {
        setRelatedVideos(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  return (
    <Box
      minHeight={"95vh"}
      sx={{
        backgroundColor: "#000",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
      >
        <Box flex={1}>
          <Box
            sx={{
              position: "sticky",
              width: "100%",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight={"bold"} p={2}>
              {video?.snippet?.title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{
                color: "#fff",
              }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${video?.snippet?.channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                  fontWeight={"bold"}
                >
                  {video?.snippet?.channelTitle}
                  <CheckCircle
                    sx={{
                      fontSize: "12px",
                      color: "gray",
                      ml: "5px",
                    }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap={"20px"} alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(video?.statistics?.viewCount).toLocaleString()}{" "}
                  Views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(video?.statistics?.likeCount).toLocaleString()}{" "}
                  Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems={"center"}
        >
          <Videos videos={relatedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
