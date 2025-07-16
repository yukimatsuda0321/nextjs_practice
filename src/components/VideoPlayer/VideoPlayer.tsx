"use client";

import { Box, Button, Slider, Stack } from "@mui/material";
import { useRef, useState, useEffect } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 再生 / 一時停止 トグル
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 5秒スキップ関数
  const skipTime = (amount: number) => {
    if (!videoRef.current) return;
    const newTime = Math.min(
      Math.max(videoRef.current.currentTime + amount, 0),
      duration
    );
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 再生時間を監視
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // シークバー移動時
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // 時間を mm:ss 形式に変換
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        controls
        controlsList="nodownload"
      >
        <source src="/videos/sample.mp4" type="video/mp4" />
        お使いのブラウザは video タグをサポートしていません。
      </video>
      <Box>
        {/* コントロール */}
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <Button variant="contained" onClick={() => skipTime(-5)}>
            ⏪ -5秒
          </Button>

          <Button variant="contained" onClick={togglePlay}>
            {isPlaying ? "⏸️ 一時停止" : "▶️ 再生"}
          </Button>

          <Button variant="contained" onClick={() => skipTime(5)}>
            +5秒 ⏩
          </Button>

          {/* 時間表示 */}
          <Box>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Box>
        </Stack>

        {/* シークバー */}
        <Slider
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          // onChange={(e, newValue) => handleSeek(newValue as number)}
          sx={{
            color: "primary.main",
            height: 2,
            "& .MuiSlider-thumb": {
              width: 2,
              height: 24,
              backgroundColor: "#1e88e5", // blue-600相当
              borderRadius: 1,
              "&:hover": {
                boxShadow: "0 0 0 8px rgba(30, 136, 229, 0.16)",
              },
            },
            "& .MuiSlider-rail": {
              opacity: 1,
              backgroundColor: "#ccc",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#1e88e5",
            },
          }}
        />
      </Box>
    </>
  );
}
