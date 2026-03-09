import React, { useState } from 'react';
import {
  Fab, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, InputLabel, Select,
  MenuItem, FormHelperText, Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface NewProbe {
  probeId: number;
  meat?: string;
  target?: number;
}

interface Props {
  availableProbes?: number[];
  onAddProbe?: (probe: Required<NewProbe>) => void;
}

function isValidProbe(p: NewProbe): p is Required<NewProbe> {
  return (
    p.probeId > 0 &&
    typeof p.meat === 'string' && p.meat.length > 0 &&
    typeof p.target === 'number' && p.target >= 50 && p.target <= 500
  );
}

export default function AddSession({ availableProbes = [], onAddProbe }: Props): React.JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [newProbe, setNewProbe] = useState<NewProbe>({ probeId: 0 });

  if (!availableProbes.length) return null;

  function handleAdd(): void {
    if (isValidProbe(newProbe)) {
      setOpen(false);
      onAddProbe?.(newProbe);
      setNewProbe({ probeId: 0 });
      setShowErrors(false);
    } else {
      setShowErrors(true);
    }
  }

  function handleClose(): void {
    setOpen(false);
    setShowErrors(false);
  }

  const targetError =
    showErrors &&
    (newProbe.target == null || newProbe.target < 50 || newProbe.target > 500);

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Fab color="primary" onClick={() => setOpen(true)}><AddIcon /></Fab>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Meat Sensor</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Meat Type"
            fullWidth
            value={newProbe.meat ?? ''}
            onChange={(e) => setNewProbe((p) => ({ ...p, meat: e.target.value }))}
            error={showErrors && !newProbe.meat}
            helperText={showErrors && !newProbe.meat ? 'Meat is required' : ''}
          />
          <TextField
            label="Target Temp (°F)"
            fullWidth
            type="number"
            value={newProbe.target ?? ''}
            onChange={(e) => setNewProbe((p) => ({ ...p, target: Number(e.target.value) }))}
            error={targetError}
            helperText={targetError ? 'Valid temperature between 50 and 500' : ''}
          />
          <FormControl fullWidth error={showErrors && newProbe.probeId <= 0}>
            <InputLabel>Which Probe?</InputLabel>
            <Select
              value={newProbe.probeId}
              label="Which Probe?"
              onChange={(e) => setNewProbe((p) => ({ ...p, probeId: e.target.value as number }))}
            >
              {availableProbes.map((id) => (
                <MenuItem key={id} value={id}>Probe {id}</MenuItem>
              ))}
            </Select>
            {showErrors && newProbe.probeId <= 0 && (
              <FormHelperText>Probe selection is required</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
