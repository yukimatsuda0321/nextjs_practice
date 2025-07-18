"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { BarChart, LineChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  file: string;
  title: string;
}

interface DataPoint {
  time: number;
  value: number;
}

export default function BarChartMUI1({ file, title }: Props) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch(`/graph/${file}`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<DataPoint>(text, {
          header: true,
          dynamicTyping: true,
        });
        const cleaned = parsed.data.filter(
          (d): d is DataPoint =>
            typeof d.time === "number" && typeof d.value === "number"
        );
        setData(cleaned);
        console.log(data);
      });
  }, [file]);

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" justifyContent="center">
        <BarChart
          height={250}
          width={700}
          series={[
            {
              data: data.map((d) => d.value),
            },
          ]}
          layout="horizontal"
        />
      </Box>
    </Box>
  );
}
