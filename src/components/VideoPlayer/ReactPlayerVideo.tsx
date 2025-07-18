"use client";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function ReactPlayerVideo() {
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  const [duration, setDuration] = useState(0);
  const fps = 60;
  const [currentTime, setCurrentTime] = useState(0);

  const onProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleClick = () => {
    setPlaying((prev) => !prev);
  };

  const stepFrame = (check: number) => {
    if (!playerRef.current) return;

    const actualTime = playerRef.current.getCurrentTime();
    const nextTime = check === 0 ? actualTime - 1 / fps : actualTime + 1 / fps;

    playerRef.current.seekTo(nextTime, "seconds");
  };

  return (
    <>
      <Box
        width="100%"
        height="auto"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <ReactPlayer
          url="/videos/sample.mp4"
          ref={playerRef}
          playing={playing}
          controls
          loop
          width="100%"
          height="100%"
          onProgress={onProgress}
          progressInterval={50}
          onSeek={(newTime) => setCurrentTime(newTime)}
          onDuration={(d) => {
            setDuration(d);
          }}
        />
      </Box>
      <Box>
        動画の長さ: {Math.floor(duration)} 秒 現在の再生時間:{" "}
        {Math.floor(currentTime)}秒
      </Box>
      <Box>
        動画の総フレーム：{Math.floor(duration * fps)}{" "}
        フレーム　現在の再生時間：
        {Math.floor(currentTime * fps)}フレーム
      </Box>

      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => stepFrame(0)}>１フレーム戻す</Button>
        <Button onClick={() => stepFrame(1)}>１フレーム進める</Button>
      </ButtonGroup>
    </>
  );
}
