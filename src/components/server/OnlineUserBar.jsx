import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

export const HEADER_HEIGHT = '64px'; 
const OnlineUsersContainer = styled(Box)(({ theme }) => ({
  width: '240px',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(2),
  overflowY: 'auto',
  borderLeft: `1px solid ${theme.palette.grey[700]}`,
  height: '100%',
  position: 'absolute', // Change this to absolute
  top: HEADER_HEIGHT,
  right: 0, // This will position it at the extreme right
  zIndex: 1,
}));

const OnlineUsersBar = ({ server }) => {
  return (
    <OnlineUsersContainer>
      <Typography variant="subtitle2" gutterBottom>
        ONLINE — 1
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={server.owner?.ProfileUserName || 'Owner'} secondary="Owner" />
        </ListItem>
      </List>
    </OnlineUsersContainer>
  );
};

export default OnlineUsersBar;