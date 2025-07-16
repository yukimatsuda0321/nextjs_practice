'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  file: string;
  title?: string;
  onSeek?: (time: number) => void; // 親から受け取る動画操作関数
}

interface DataPoint {
  time: number;
  value: number;
}

export default function CsvChart({ file, title, onSeek }: Props) {
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

  // グラフ上をクリックしたときの処理
  const handleClick = (e: any) => {
    if (e && e.activePayload && e.activePayload[0]) {
      const clickedTime = e.activePayload[0].payload.time;
      if (onSeek) onSeek(clickedTime);
    }
  };

  return (
    <div>
      {title && <h3>{title}</h3>}
      <LineChart
        width={500}
        height={250}
        data={data}
        onClick={handleClick}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
