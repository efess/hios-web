import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

type PaletteKey = string;
const presets: Record<PaletteKey, number[]> = {
  party: [0x5500AB,0x84007C,0xB5004B,0xE5001B,0xE81700,0xB84700,0xAB7700,0xABAB00,0xAB5500,0xDD2200,0xF2000E,0xC2003E,0x8F0071,0x5F00A1,0x2F00D0,0x0007F9],
  christmas: [0xFF0000,0xFFFFFF,0x00FF00,0xFFFFFF,0xFF0000,0xFFFFFF,0x00FF00,0xFFFFFF,0xFF0000,0xFFFFFF,0x00FF00,0xFFFFFF,0xFF0000,0xFFFFFF,0x00FF00,0xFFFFFF],
  cute: [0xFFC1A6,0x62C6AF,0xE528DC,0x4E81DC,0xFFC1A6,0x62C6AF,0xE528DC,0x4E81DC,0xFFC1A6,0x62C6AF,0xE528DC,0x4E81DC,0xFFC1A6,0x62C6AF,0xE528DC,0x4E81DC],
  dawn: [0xE1B245,0xE16C2E,0xECED0C,0xEC3233,0xE1B245,0xE16C2E,0xECED0C,0xEC3233,0xE1B245,0xE16C2E,0xECED0C,0xEC3233,0xE1B245,0xE16C2E,0xECED0C,0xEC3233],
  bluegreen: [0x0000FF,0x0000FF,0x0000FF,0x0000FF,0xFFFFFF,0xFFFFFF,0x0000FF,0x00FF00,0x00FF00,0x0000FF,0x0000FF,0xFFFFFF,0xFFFFFF,0x0000FF,0x00FF00,0x0000FF],
  rainbow: [0xFF0000,0xD52A00,0xAB5500,0xAB7F00,0xABAB00,0x56D500,0x00FF00,0x00D52A,0x00AB55,0x0056AA,0x0000FF,0x2A00D5,0x5500AB,0x7F0081,0xAB0055,0xD5002B],
  jason: [0x84007C,0x84007C,0x84007C,0x0007F9,0x0007F9,0x0007F9,0x84007C,0x84007C,0x84007C,0x0007F9,0x0007F9,0x0007F9,0x84007C,0x84007C,0x0007F9,0x0007F9],
  lumberjack: [0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF,0xFF0000,0xFFFFFF],
  lumberjack2: [0xFF0000,0xFFFFFF,0xffc300,0xFF0000,0xFFFFFF,0xffc300,0xFF0000,0xFFFFFF,0xffc300,0xFF0000,0xFFFFFF,0xffc300,0xFF0000,0xFFFFFF,0xffc300,0xFF0000],
  lumberjack3: [0xFF0000,0xFFFFFF,0xFF0000,0xffc300,0xFF0000,0xFFFFFF,0xFF0000,0xffc300,0xFF0000,0xFFFFFF,0xFF0000,0xffc300,0xFF0000,0xFFFFFF,0xFF0000,0xffc300],
};

function findMatchingPreset(pallete: number[] | undefined): PaletteKey | null {
  if (!pallete) return null;
  for (const key of Object.keys(presets)) {
    if (presets[key]!.every((val, i) => val === pallete[i])) return key;
  }
  return null;
}

function colorToHex(color: number): string {
  return '#' + color.toString(16).padStart(6, '0');
}

function presetGradient(preset: number[]): string {
  const stops = preset.map((c, i) => `${colorToHex(c)} ${Math.round((i / 16) * 100)}%`).join(', ');
  return `linear-gradient(to right, ${stops})`;
}

interface Props {
  pallete?: number[];
  updateValue?: (arg: unknown, val: number[]) => void;
}

export default function Pallete({ pallete, updateValue }: Props): React.JSX.Element {
  const selectedKey = findMatchingPreset(pallete) ?? 'party';

  function handleChange(key: PaletteKey): void {
    const preset = presets[key];
    if (preset) updateValue?.(null, preset);
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Pattern</InputLabel>
      <Select
        value={selectedKey}
        label="Pattern"
        onChange={(e) => handleChange(e.target.value as PaletteKey)}
      >
        {Object.keys(presets).map((key) => (
          <MenuItem key={key} value={key}>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  height: 20, borderRadius: 0.5, mb: 0.25,
                  background: presetGradient(presets[key]!),
                }}
              />
              <span>{key}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
