import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, List, ListItem, ListItemIcon, ListItemText, TextField, IconButton, Avatar, Divider } from '@mui/material';
import { Add as AddIcon, Tag as TagIcon, VolumeUp as VolumeUpIcon, EmojiEmotions, GifBox, AttachFile, Send } from '@mui/icons-material';

const ServerContentContainer = styled('div')({
  display: 'flex',
  height: 'calc(100vh - 48px)', // Adjust this value based on your header height
  overflow: 'hidden',
});

const ChannelSidebar = styled('div')(({ theme }) => ({
  width: '240px',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const ChatArea = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme => theme.palette.grey[800],
});

const ChatHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[700]}`,
  backgroundColor: theme.palette.grey[800],
}));

const MessageArea = styled('div')({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
});

const InputArea = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[800],
}));

const UserSidebar = styled('div')(({ theme }) => ({
  width: '240px',
  backgroundColor: theme.palette.grey[800],
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const ServerContent = ({ server }) => {
  return (
    <ServerContentContainer>
      <ChannelSidebar>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>TEXT CHANNELS</Typography>
        <List>
          <ListItem button selected>
            <ListItemIcon><TagIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="general" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Add Channel" />
          </ListItem>
        </List>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>VOICE CHANNELS</Typography>
        <List>
          <ListItem button>
            <ListItemIcon><VolumeUpIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
        </List>
      </ChannelSidebar>
      <ChatArea>
        <ChatHeader>
          <Typography variant="h6"># general</Typography>
        </ChatHeader>
        <MessageArea>
          <Typography variant="h4" align="center" style={{ marginTop: '20%' }}>
            Welcome to {server?.name || 'the server'}
          </Typography>
          <Typography variant="body1" align="center">
            This is your brand new, shiny server. Here are some steps to help you get started.
          </Typography>
          {/* Add welcome steps here */}
        </MessageArea>
        <InputArea>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Message #general`}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton size="small"><EmojiEmotions /></IconButton>
                  <IconButton size="small"><GifBox /></IconButton>
                  <IconButton size="small"><AttachFile /></IconButton>
                </>
              ),
            }}
          />
          <IconButton style={{ marginLeft: '8px' }}><Send /></IconButton>
        </InputArea>
      </ChatArea>
      <UserSidebar>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>ONLINE — 1</Typography>
        <List>
          <ListItem>
            <ListItemIcon><Avatar sx={{ width: 32, height: 32 }}>Z</Avatar></ListItemIcon>
            <ListItemText primary="Zoro" secondary="Online" />
          </ListItem>
        </List>
        <Divider />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>OFFLINE — 0</Typography>
        {/* Add offline users here if needed */}
      </UserSidebar>
    </ServerContentContainer>
  );
};

export default ServerContent;