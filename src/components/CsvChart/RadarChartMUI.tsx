"use client";

import { Paper, Typography } from "@mui/material";
import { RadarChart } from "@mui/x-charts";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import React from "react";

interface Props {
  file: string;
  title: string;
}

interface DataPoint {
  metric: string;
  value: number;
  max: number;
}

const RadarChartMUI = ({ file, title }: Props) => {
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [metrics, setMetrics] = useState<{ name: string; max: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, [file]);

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>

      {/* データが揃ったときのみ表示 */}
      {seriesData.length > 0 && metrics.length > 0 ? (
        <RadarChart
          height={350}
          series={[{ label: title, data: seriesData, fillArea: true }]}
          radar={{ metrics }}
        />
      ) : (
        <Typography align="center" variant="body2" color="text.secondary">
          {loading ? "読み込み中..." : "データが見つかりません"}
        </Typography>
      )}
    </Paper>
  );
};

export default RadarChartMUI;
