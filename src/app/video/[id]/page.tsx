"use client";

import CsvChartMUI from "@/components/CsvChart/CsvChartMUI";
import RadarChartMUI from "@/components/CsvChart/RadarChartMUI";
import { Box, Stack, Switch, Typography } from "@mui/material";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";

import ReactPlayerVideo from "@/components/VideoPlayer/ReactPlayerVideo";
import BarChartMUI1 from "@/components/CsvChart/BarChartMUI";
import CsvChartMUI1 from "@/components/CsvChart/CsvChartMUI1";
import BarChartRehart from "@/components/CsvChart/BarChartRecharts";

const csvFiles = Array.from({ length: 20 }, (_, i) => ({
  file: "sample1.csv",
  title: `センサー${i + 1}`,
}));

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [checked, setChecked] = React.useState(true);

  const [post, setPost] = useState<Post | null>(null);

  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await fetch(`/api/post/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        console.error("投稿が見つかりません");
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p>読み込み中...</p>;
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ backgroundColor: "#d8e9be", padding: "20px" }}
        spacing={5}
      >
        <Typography variant="h3">解析結果</Typography>
        <Stack>
          <Typography variant="h6">{post.author.name}さん</Typography>
          <Typography variant="h6">
            {format(new Date(post.createdAt), "yyyy/M/d HH:mm:ss", {
              locale: ja,
            })}
          </Typography>
          <Typography variant="h6">
            {format(new Date(post.createdAt), "yyyy/M/d HH:mm:ss", {
              locale: ja,
            })}
          </Typography>
        </Stack>

        <Box sx={{ marginRight: "auto" }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            sx={{ marginRight: "auto" }}
          />
        </Box>
      </Stack>

      <Stack direction={"row"} width="100%" height="100%">
        <Stack
          width={"60%"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#c2ed82",
          }}
        >
          <ReactPlayerVideo />
        </Stack>

        <Stack
          width="50%"
          sx={{
            maxHeight: "calc(100vh - 100px)",
            flex: 1,
            overflowY: "auto",
            p: 2,
          }}
        >
          {checked && (
            <>
              <Box sx={{ mt: 2, p: 2, border: "1px solid gray" }}>
                <Typography variant="h6" gutterBottom>
                  レーダーチャート
                </Typography>
                <RadarChartMUI
                  title="患者さんのクモの巣チャート"
                  file={"RadarChart1.csv"}
                />
              </Box>
              <Box sx={{ mt: 2, p: 2, border: "1px solid gray" }}>
                <Typography>バーグラフ　速度など</Typography>
                {/* <BarChartMUI1
                  title="患者さんのバーグラフ表示"
                  file={"Sample2.csv"}
                /> */}
                <BarChartRehart
                  title="患者さんのバーグラフ表示"
                  file={"Sample2.csv"}
                />
              </Box>
            </>
          )}

          {csvFiles.map((csv, index) => (
            <CsvChartMUI1 key={index} file={csv.file} title={csv.title} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
