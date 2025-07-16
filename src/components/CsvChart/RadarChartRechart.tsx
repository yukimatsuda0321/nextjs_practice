"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

function parseCSV(csv: string) {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",");

  return lines.map((line) => {
    const values = line.split(",");
    const obj: Record<string, string | number> = {};
    headers.forEach((header, i) => {
      const value = values[i];
      obj[header] = isNaN(Number(value)) ? value : Number(value);
    });
    return obj;
  });
}

type Props = {
  title: string;
  csvPath: string; // 例: "/data.csv"
};

export default function RadarChartRechart({ title, csvPath }: Props) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(csvPath)
      .then((res) => res.text())
      .then((csv) => {
        const parsed = parseCSV(csv);
        setData(parsed);
      })
      .catch((err) => console.error("CSV読み込みエラー:", err));
  }, [csvPath]);

  if (data.length === 0) return <p>読み込み中...</p>;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 150]} />
          <Radar
            name="A"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="B"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
