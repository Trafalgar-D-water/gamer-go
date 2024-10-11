import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';

const AddServerDialog = ({ open, onClose, onAddServer }) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Call your backend API to create a new guild (server)
      const response = await fetch('http://localhost:3004/api/create-guild', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` 
        },
        body: JSON.stringify({ name, logo, isPublic }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create guild');
      }
      
      const newGuild = await response.json();
      console.log('New guild created:', newGuild);
      onAddServer(newGuild);
      onClose();
    } catch (error) {
      console.error('Error creating guild:', error);
      setError('Failed to create guild. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setLogo('');
    setIsPublic(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Guild</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          autoFocus
          margin="dense"
          label="Guild Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Logo URL (optional)"
          fullWidth
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          }
          label="Public Guild"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isLoading || !name.trim()}>
          {isLoading ? <CircularProgress size={24} /> : 'Create Guild'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddServerDialog;