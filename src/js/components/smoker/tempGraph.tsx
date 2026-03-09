import React from 'react';
import { Box } from '@mui/material';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts';
import { TemperaturePoint } from '../../types/api';

const COLORS = ['#FF9900', '#CC3300', '#3399FF', '#33CC99'] as const;

function formatTimeAgo(ts: number): string {
  const diff = Math.ceil((Date.now() - ts) / 1000);
  const mins = Math.floor(diff / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return `${diff}s ago`;
}

function formatTimeAbsolute(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

type ChartEntry = Record<string, number>;

const TEN_MINUTES_MS = 10 * 60 * 1000;

interface Props {
  datasets?: TemperaturePoint[][];
  height?: number;
  historical?: boolean;
}

export default function TempGraph({ datasets = [[]], height = 180, historical = false }: Props): React.JSX.Element {
  const formatTime = historical ? formatTimeAbsolute : formatTimeAgo;
  const allData: ChartEntry[] = [];

  datasets.forEach((dataset, di) => {
    (dataset ?? []).forEach((point) => {
      const existing = allData.find((d) => d['timestamp'] === point.timestamp);
      if (existing) {
        existing[`temp${di}`] = point.temp;
      } else {
        allData.push({ timestamp: point.timestamp, [`temp${di}`]: point.temp });
      }
    });
  });
  allData.sort((a, b) => (a['timestamp'] ?? 0) - (b['timestamp'] ?? 0));

  // Trim leading/trailing entries where temp0 is 0
  while (allData.length > 0 && (allData[0]!['temp0'] ?? 0) === 0) {
    allData.shift();
  }
  while (allData.length > 0 && (allData[allData.length - 1]!['temp0'] ?? 0) === 0) {
    allData.pop();
  }

  let xDomain: [number | string, number | string] = ['dataMin', 'dataMax'];
  if (historical && allData.length > 0) {
    const minTs = allData[0]!['timestamp']!;
    const maxTs = allData[allData.length - 1]!['timestamp']!;
    xDomain = [minTs - TEN_MINUTES_MS, maxTs + TEN_MINUTES_MS];
  }

  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart data={allData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            tick={{ fontSize: 10, fill: '#aaa' }}
            type="number"
            domain={xDomain}
            scale="time"
            tickCount={12}
          />
          <YAxis domain={[0, 350]} tick={{ fontSize: 10, fill: '#aaa' }} />
          <Tooltip
            labelFormatter={(label: number) => formatTime(label)}
            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #444' }}
            isAnimationActive={false}
            cursor={{ stroke: '#666' }}
          />
          {datasets.map((_, di) => (
            <Line
              key={di}
              type="monotone"
              dataKey={`temp${di}`}
              stroke={COLORS[di % COLORS.length]}
              dot={false}
              strokeWidth={2}
              connectNulls
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
