"use client";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { ReactPlayerProps } from "react-player/types";

export default function ReactPlayerVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <ReactPlayer
        src="videos/sample.mp4"
        playing={playing}
        controls
        width="100%"
        height="100%"
      />
    </>
  );
}
