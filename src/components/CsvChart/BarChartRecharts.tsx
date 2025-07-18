"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

interface Props {
  file: string;
  title: string;
}

interface DataPoint {
  time: number;
  value: number;
}

const CustomLabel = ({ x, y, width, height, value }: any) => (
  <text
    x={x + width / 2}
    y={y + height / 2}
    fill="#fff"
    fontSize={20}
    textAnchor="middle"
    alignmentBaseline="middle"
    fontWeight="bold"
  >
    {value}
  </text>
);

export default function BarChartRehart({ file, title }: Props) {
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

  return (
    <>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical" // 横向きにする！
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="time" type="category" />
          <Tooltip />
          <Bar dataKey="value" label={<CustomLabel />}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
