import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import EnvironmentLineChart from './lineChart';
import ajax, { AjaxHandle } from '../../app/ajax';
import { isEnvironmentStatusResponse } from '../../types/api';

const granularityOptions: Array<{ value: number; label: string }> = [
  { value: 10, label: 'Ten Seconds' },
  { value: 60, label: 'One Minute' },
  { value: 300, label: 'Five Minutes' },
  { value: 900, label: 'Fifteen Minutes' },
  { value: 3600, label: 'One Hour' },
];

interface TempPoint { timestamp: number; temp: number; }

function cToF(c: number): number { return c * 1.8 + 32; }

export default function RoomStatus(_props: { args: string[] | null }): React.JSX.Element {
  const [granularity, setGranularity] = useState(10);
  const [temps, setTemps] = useState<TempPoint[]>([]);
  const refreshRef = useRef(true);
  const requestRef = useRef<AjaxHandle | null>(null);
  const granRef = useRef(granularity);
  granRef.current = granularity;

  const loadState = useCallback((gran?: number) => {
    requestRef.current?.abort();
    requestRef.current = ajax.post('/api/environment/status', {
      gran: gran ?? granRef.current,
      deviceId: 'device',
    });
    requestRef.current.promise().then(
      (data: unknown) => {
        if (isEnvironmentStatusResponse(data)) {
          setTemps(data.history.map((h) => ({ timestamp: h.timestamp, temp: cToF(h.temperature) })));
        }
      },
      (err: unknown) => console.error('Failed getting environment status:', err)
    );
  }, []);

  useEffect(() => {
    refreshRef.current = true;
    function refresh(): void {
      loadState();
      setTimeout(() => { if (refreshRef.current) refresh(); }, 5000);
    }
    refresh();
    return () => {
      refreshRef.current = false;
      requestRef.current?.abort();
    };
  }, [loadState]);

  function handleGranChange(value: number): void {
    setGranularity(value);
    loadState(value);
  }

  return (
    <Box sx={{ p: 1 }}>
      <Paper sx={{ p: 2, mb: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Graph Granularity</InputLabel>
              <Select
                value={granularity}
                label="Graph Granularity"
                onChange={(e) => handleGranChange(e.target.value as number)}
              >
                {granularityOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="primary">Living Room Temperature</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 1 }}>
        <EnvironmentLineChart history={temps} height={300} />
      </Paper>
    </Box>
  );
}
