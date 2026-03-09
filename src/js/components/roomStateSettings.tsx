import React, { useState } from 'react';
import {
  Box, Grid, Typography, Slider,
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { SketchPicker, ColorResult } from 'react-color';
import Modal from 'react-modal';
import Pallete from './pallete';
import { RoomState } from '../types/api';

interface AnimationOption { value: number; text: string; }

const animations: AnimationOption[] = [
  { value: 0, text: 'Strait' },
  { value: 1, text: 'Motion' },
  { value: 2, text: 'Twinkle' },
  { value: 3, text: 'Rainbow' },
  { value: 4, text: 'Runner' },
  { value: 5, text: 'Lights' },
  { value: 6, text: 'Fire Pit' },
  { value: 7, text: 'Sound Beats' },
];

const transitions: AnimationOption[] = [
  { value: 0, text: 'None' },
  { value: 1, text: 'Fade' },
  { value: 2, text: 'Pixelate' },
];

interface Rgb { r: number; g: number; b: number; }

function decToRgb(dec: number): Rgb {
  return { r: (dec >> 16) & 0xff, g: (dec >> 8) & 0xff, b: dec & 0xff };
}

function rgbToDec(rgb: Rgb): number {
  return (rgb.r << 16) | (rgb.g << 8) | rgb.b;
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1300,
};

const modalContentStyle: React.CSSProperties = {
  border: 'none',
  padding: '10px',
  backgroundColor: 'transparent',
  position: 'absolute',
  top: '90px',
  right: '60px',
  bottom: 'auto',
  left: 'auto',
};

interface Props {
  data: RoomState | null;
  updateValue: (key: keyof RoomState, value: RoomState[keyof RoomState]) => void;
}

export default function RoomStateSettings({ data, updateValue }: Props): React.JSX.Element {
  const [showPicker, setShowPicker] = useState(false);
  const [localColor, setLocalColor] = useState<number | null>(null);

  const d = data ?? { brightness: 0, animation: 0, transition: 0, color: 0 };
  const decColor = localColor ?? d.color;
  const rgb = decToRgb(decColor);
  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  function handleColorChange(color: ColorResult): void {
    setLocalColor(rgbToDec(color.rgb as Rgb));
  }

  function handleColorClose(): void {
    setShowPicker(false);
    if (localColor !== null) {
      updateValue('color', localColor);
    }
  }

  function clamp(min: number, max: number, val: number): number {
    return Math.max(min, Math.min(max, val));
  }

  Modal.setAppElement(document.body);

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>Color</Typography>
          <Box
            onClick={() => setShowPicker(true)}
            sx={{
              width: 70, height: 45, borderRadius: 1,
              backgroundColor: colorStyle, cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.2)',
              '&:hover': { border: '2px solid rgba(255,255,255,0.5)' },
            }}
          />
          <Modal
            isOpen={showPicker}
            onRequestClose={handleColorClose}
            style={{ overlay: modalOverlayStyle, content: modalContentStyle }}
            contentLabel="Color Picker"
          >
            <SketchPicker color={rgb} onChange={handleColorChange} onChangeComplete={handleColorChange} />
          </Modal>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Brightness: {d.brightness}</Typography>
            <Slider
              value={clamp(0, 15, d.brightness)}
              min={0} max={15} step={1}
              onChange={(_, v) => updateValue('brightness', v as number)}
              sx={{ color: 'primary.main' }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Animation</InputLabel>
              <Select
                value={d.animation}
                label="Animation"
                onChange={(e) => updateValue('animation', e.target.value as number)}
              >
                {animations.map((a) => (
                  <MenuItem key={a.value} value={a.value}>{a.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Transition</InputLabel>
              <Select
                value={d.transition}
                label="Transition"
                onChange={(e) => updateValue('transition', e.target.value as number)}
              >
                {transitions.map((t) => (
                  <MenuItem key={t.value} value={t.value}>{t.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Pattern</Typography>
            <Pallete
              pallete={d.pallete}
              updateValue={(_: unknown, val: number[]) => updateValue('pallete', val)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
