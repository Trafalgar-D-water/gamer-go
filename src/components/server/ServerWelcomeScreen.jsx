import React, { useState } from 'react';
import { Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, Divider, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagIcon from '@mui/icons-material/Tag';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import OnlineUserBar from './OnlineUserBar';

const WelcomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  color: theme.palette.common.white,
  overflow: 'hidden',
}));

const LeftSidebar = styled(Box)(({ theme }) => ({
  width: '240px',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  // backgroundColor: theme.palette.grey[800],
  overflow: 'hidden',
}));

const MessageArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding:'16px',
  display: 'flex',
  flexDirection: 'column-reverse',
}));

const MessageInputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[900],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.grey[700],
    '&:hover': {
      backgroundColor: theme.palette.grey[600],
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.grey[700],
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.common.white,
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const WelcomeContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(3),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  width: '300px',
  justifyContent: 'flex-start',
  padding: theme.spacing(1, 2),
}));

const ServerWelcomeScreen = ({ server }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'You' }]);
      setMessage('');
    }
  };

  return (
    <WelcomeContainer>
      <LeftSidebar>
        <Typography variant="h6" gutterBottom>
          {server.name}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" gutterBottom>
          TEXT CHANNELS
        </Typography>
        <List>
          <ListItem button component="li">
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary="general" />
          </ListItem>
        </List>
        <Typography variant="subtitle2" gutterBottom>
          VOICE CHANNELS
        </Typography>
        <List>
          <ListItem button component="li">
            <ListItemIcon>
              <VolumeUpIcon />
            </ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
        </List>
      </LeftSidebar>
      
      <MainContent>
        {messages.length === 0 ? (
          <WelcomeContent>
            <Typography variant="h4" gutterBottom>
              Welcome to {server.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              This is your brand new, shiny server. Here are some steps to help you get started:
            </Typography>
            <ActionButton variant="contained" color="primary" startIcon={<PersonIcon />}>
              Invite your friends
            </ActionButton>
            <ActionButton variant="contained" color="secondary" startIcon={<PersonIcon />}>
              Personalize your server with an icon
            </ActionButton>
            <ActionButton variant="contained" color="info" startIcon={<PersonIcon />}>
              Send your first message
            </ActionButton>
            <ActionButton variant="contained" color="success" startIcon={<PersonIcon />}>
              Download the Discord App
            </ActionButton>
            <ActionButton variant="contained" color="warning" startIcon={<PersonIcon />}>
              Add your first app
            </ActionButton>
          </WelcomeContent>
        ) : (
          <MessageArea>
            {messages.map((msg, index) => (
              <Typography key={index} sx={{ mb: 1 }}>
                <strong>{msg.sender}:</strong> {msg.text}
              </Typography>
            ))}
          </MessageArea>
        )}
        <MessageInputArea>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage} disabled={!message.trim()}>
            <SendIcon />
          </SendButton>
        </MessageInputArea>
      </MainContent>
      
      <OnlineUserBar server={server} />
    </WelcomeContainer>
  );
};

export default ServerWelcomeScreen;