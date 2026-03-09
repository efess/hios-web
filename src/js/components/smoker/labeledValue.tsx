import React, { useState } from 'react';
import {
  Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField,
} from '@mui/material';

type MuiColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
type MuiVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';

interface Props {
  value?: number | string;
  name?: string;
  change?: (value: string) => void;
  color?: MuiColor;
  size?: MuiVariant;
}

export default function LabeledValue({
  value = '',
  name = 'Value',
  change,
  color = 'secondary',
  size = 'h4',
}: Props): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [newVal, setNewVal] = useState('');

  function handleClose(): void {
    setOpen(false);
    if (newVal) change?.(newVal);
    setNewVal('');
  }

  return (
    <>
      <Typography
        variant={size}
        color={color}
        fontWeight={700}
        onClick={() => setOpen(true)}
        sx={{ cursor: 'pointer' }}
      >
        {value}°
      </Typography>
      <Typography variant="caption" color="text.secondary">{name}</Typography>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Change {name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus label={name} type="number" fullWidth sx={{ mt: 1 }}
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
