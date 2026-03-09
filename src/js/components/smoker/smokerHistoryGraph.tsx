import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import TempGraph from './tempGraph';
import ajax from '../../app/ajax';
import {
  TemperaturePoint,
  ProbeDetail,
  isSmokerSessionEventsResponse,
} from '../../types/api';

const DEVICE_ID = '31316536-6633-3939-2d64-6362372d3436';

interface Props {
  sessionId: string | null;
}

function toMs(d: TemperaturePoint): TemperaturePoint {
  return { timestamp: d.timestamp * 1000, temp: d.temp };
}

function hasVariation(points: TemperaturePoint[]): boolean {
  const temps = points.filter((p) => p.temp > 0);
  if (temps.length === 0) return false;
  const min = Math.min(...temps.map((p) => p.temp));
  const max = Math.max(...temps.map((p) => p.temp));
  return max - min > 5;
}

function buildDatasets(probeDetails: ProbeDetail[]): TemperaturePoint[][] {
  return probeDetails
    .map((probe) => (probe?.history.data ?? []).map(toMs))
    .filter(hasVariation);
}

export default function SmokerHistoryGraph({ sessionId }: Props): React.JSX.Element {
  const [probeDetails, setProbeDetails] = useState<ProbeDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    const req = ajax.post('/api/smokes/getHistoryEntryEvents', {
      deviceId: DEVICE_ID,
      sessionId,
    });
    req.promise().then(
      (data: unknown) => {
        if (isSmokerSessionEventsResponse(data)) {
          setProbeDetails(data.probeDetail);
        }
        setLoading(false);
      },
      (err: unknown) => { console.error('Failed getting events:', err); setLoading(false); }
    );
    return () => req.abort();
  }, [sessionId]);

  const datasets = buildDatasets(probeDetails);

  return (
    <Box sx={{ opacity: loading ? 0.5 : 1 }}>
      <TempGraph datasets={datasets} historical />
    </Box>
  );
}
