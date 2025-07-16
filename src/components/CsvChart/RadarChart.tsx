"use client";

import { Paper, Typography } from "@mui/material";
import { RadarChart } from "@mui/x-charts";
import Papa from "papaparse";
import { useEffect, useState } from "react";

interface Props {
  file: string;
  title: string;
}

interface DataPoint {
  metric: string; // 軸の名前
  value: number; // データ値
  max: number; // 最大値
}

const RadarChartMUI = ({ file, title }: Props) => {
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [metrics, setMetrics] = useState<{ name: string; max: number }[]>([]);

  useEffect(() => {
    fetch(`/RadarChart/${file}`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<DataPoint>(text, {
          header: true,
          dynamicTyping: true,
        });

        const cleaned = parsed.data.filter(
          (d): d is DataPoint =>
            typeof d.metric === "string" &&
            typeof d.value === "number" &&
            typeof d.max === "number"
        );

        setSeriesData(cleaned.map((d) => d.value));
        setMetrics(cleaned.map((d) => ({ name: d.metric, max: d.max })));
      });
  }, [file]);

  return (
    <>
      {/* <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <RadarChart
          height={350}
          series={[{ label: title, data: seriesData }]}
          radar={{ metrics: metrics }}
        />
      </Paper> */}
    </>
  );
};

export default RadarChartMUI;
