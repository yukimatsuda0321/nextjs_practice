import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { time: 0, value: 100 },
  { time: 1, value: 120 },
  { time: 2, value: 90 },
];

export default function TestChart() {
  return (
    <Card sx={{ maxWidth: 700, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          テストグラフ
        </Typography>
        <Box>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </Box>
      </CardContent>
    </Card>
  );
}
