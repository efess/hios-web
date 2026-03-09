import React from 'react';
import { Paper, Box, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';

interface ProbeInfo {
  temp: number;
}

interface Props {
  granularity?: number;
  probes?: ProbeInfo[];
  onGranularityChange?: (value: number) => void;
}

const granularityOptions: Array<{ value: number; label: string }> = [
  { value: 10, label: 'Ten Seconds' },
  { value: 60, label: 'One Minute' },
  { value: 300, label: 'Five Minutes' },
  { value: 900, label: 'Fifteen Minutes' },
  { value: 3600, label: 'One Hour' },
];

const PROBE_IDS = [0, 1, 2, 3] as const;

export default function TopStuff({
  granularity = 10,
  probes = [],
  onGranularityChange,
}: Props): React.JSX.Element {
  return (
    <Paper sx={{ p: 2, mb: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Graph Granularity</InputLabel>
            <Select
              value={granularity}
              label="Graph Granularity"
              onChange={(e) => onGranularityChange?.(e.target.value as number)}
            >
              {granularityOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {PROBE_IDS.map((idx) => (
              <Box key={idx} sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Probe {idx}</Typography>
                <Typography variant="body2" fontWeight={700}>
                  {probes[idx]?.temp ?? '---'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
