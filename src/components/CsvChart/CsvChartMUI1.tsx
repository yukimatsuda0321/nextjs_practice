"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { LineChart } from "@mui/x-charts";
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
      });
  }, [file]);

  const Yheight = 250;

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 3 }}>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Box display="flex" justifyContent="center">
          <LineChart
            height={Yheight}
            width={700}
            xAxis={[
              {
                data: data.map((d) => d.time),
                label: "Time",
              },
            ]}
            yAxis={[
              {
                id: "right",
                label: "Value",
              },
            ]}
            series={[
              {
                data: data.map((d) => d.value),
                label: "Value",
                color: "#8884d8",
                showMark: false, // dot={false} 相当
              },
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
