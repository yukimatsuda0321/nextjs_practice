"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  file: string;
  title?: string;
  onSeek?: (time: number) => void;
}

interface DataPoint {
  time: number;
  value: number;
}

export default function CsvChartMUI({ file, title }: Props) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch(`/graph/${file}`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<DataPoint>(text, {
          header: true,
          dynamicTyping: true,
        });
        setData(parsed.data);
      });
  }, [file]);

  const Yheight = 250;

  return (
    <>
      <Box sx={{ height: Yheight, maxWidth: 700, margin: "20px auto" }}>
        <Typography variant="h6">{title}</Typography>
        <LineChart width={800} height={Yheight - 50} data={data}>
          <CartesianGrid stroke="#ccc" vertical={false} />
          <XAxis dataKey="time" />
          <YAxis orientation="right" />
          <Tooltip />
          <Line
            color="blue"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </Box>
    </>
  );
}
