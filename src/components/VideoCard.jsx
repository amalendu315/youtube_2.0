import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../constants/constants";

const VideoCard = ({ video }) => {
  const { videoId } = video.id;
  const { thumbnails } = video.snippet;
  return (
    <Card
      className=""
      sx={{
        width: {
          xs: "100%",
          sm: "358px",
          md: "320px",
        },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          src={thumbnails?.high?.url}
          alt={video?.snippet?.title}
          sx={{
            width: {
              xs: "100%",
              sm: "358px",
              md: "320px",
            },
            height: 180,
          }}
          component="img"
        />
        <CardContent
          sx={{
            backgroundColor: "#1e1e1e",
            height: "106px",
          }}
        >
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography variant="subtitle1" fontWeight="bold" color="#fff">
              {" "}
              {video?.snippet?.title?.slice(0, 60) ||
                demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
          <Link
            to={
              video?.snippet?.channelId
                ? `/channel/${video?.snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Typography variant="subtitle2" fontWeight="bold" color="gray">
              {video?.snippet?.channelTitle || demoChannelTitle}
              <CheckCircle
                sx={{
                  fontSize: 12,
                  color: "gray",
                  ml: "5px",
                }}
              />
            </Typography>
          </Link>
        </CardContent>
      </Link>
    </Card>
  );
};

export default VideoCard;
