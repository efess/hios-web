import React, { useState } from 'react';
import {
  IconButton, Menu, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CloseSessionPayload {
  tableId: number;
  probeId: number;
  end: number;
  description?: string;
}

interface Props {
  onCloseSession: (payload: CloseSessionPayload) => void;
  probeId: number;
  tableId: number;
}

export default function SessionOptions({ onCloseSession, probeId, tableId }: Props): React.JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [description, setDescription] = useState('');

  function handleDone(): void {
    setAnchorEl(null);
    setDialogOpen(true);
  }

  function handleConfirmClose(): void {
    setDialogOpen(false);
    onCloseSession({ tableId, probeId, end: Date.now(), description });
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleDone}>Mark as Done</MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Close Session</DialogTitle>
        <DialogContent>
          <TextField
            label="How did it come out?"
            fullWidth multiline rows={6} sx={{ mt: 1 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmClose} variant="contained" color="primary">Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
