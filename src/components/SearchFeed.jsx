import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Videos } from "../components";
import axios from "axios";
import { X_RAPID_API_KEY } from "../constants/constants";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  const options = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/search",
    params: {
      q: `${searchTerm}`,
      part: "snippet,id",
      maxResults: "50",
      order: "date",
    },
    headers: {
      "X-RapidAPI-Key": X_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setVideos(response?.data?.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchTerm]);

  return (
    <>
      <Box
        p={2}
        sx={{
          overflowY: "auto",
          height: "90vh",
          flex: 2,
          backgroundColor: "#000",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          mb={2}
          sx={{
            color: "#fff",
          }}
        >
          Search Results for{" "}
          <span
            style={{
              color: "#FC1503",
            }}
          >
            {searchTerm}
          </span>{" "}
          videos
        </Typography>
        <Videos videos={videos} />
      </Box>
    </>
  );
};

export default SearchFeed;
