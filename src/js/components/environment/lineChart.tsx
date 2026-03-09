import React from 'react';
import { Box } from '@mui/material';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts';

interface TempPoint {
  timestamp: number;
  temp: number;
}

interface Props {
  history?: TempPoint[];
  height?: number;
}

function formatTime(ts: number): string {
  const diff = Math.ceil((Date.now() - ts * 1000) / 1000);
  const mins = Math.floor(diff / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return `${diff}s ago`;
}

export default function EnvironmentLineChart({ history = [], height = 220 }: Props): React.JSX.Element {
  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart
          data={history.map((d) => ({ timestamp: d.timestamp, temp: d.temp }))}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            tick={{ fontSize: 10, fill: '#aaa' }}
            type="number"
            domain={['dataMin', 'dataMax']}
            scale="time"
          />
          <YAxis tick={{ fontSize: 10, fill: '#aaa' }} />
          <Tooltip
            labelFormatter={(label: number) => formatTime(label)}
            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #444' }}
            formatter={(value: number) => [`${value.toFixed(1)}°F`, 'Temp']}
          />
          <Line type="monotone" dataKey="temp" stroke="#3399FF" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
