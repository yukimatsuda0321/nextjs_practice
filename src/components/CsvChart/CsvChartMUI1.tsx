"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { LineChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  file: string;
  title: string;
}

interface DataPoint {
  time: number;
  value: number;
}

export default function CsvChartMUI1({ file, title }: Props) {
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
      <Box display="flex" justifyContent="center" width={"100%"} height={250}>
        <LineChart
          xAxis={[
            {
              data: data.map((d) => d.time),
              position: "none",
            },
          ]}
          yAxis={[{ position: "right", tickMinStep: 10 }]}
          series={[
            {
              data: data.map((d) => d.value),
              color: "#8884d8",
              showMark: false,
            },
          ]}
          grid={{ horizontal: true }}
        />
      </Box>
    </Box>
  );
}
