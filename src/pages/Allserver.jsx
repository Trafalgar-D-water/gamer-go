import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchAllServers, joinServer } from '../service/serverService';
import Page from '../components/Page';
import { getSocket } from '../config/socket.config';


const AllServersContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[800],
  minHeight: '100vh',
  color: theme.palette.common.white,
}));

const JoinButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const AllServers = () => {
  const [servers, setServers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error , setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServers = async () => {
      try {
        setIsLoading(true);
        const allServers = await fetchAllServers();
        console.log('Fetched servers:', allServers);
        setServers(allServers);
      } catch (error) {
        console.error('Failed to load servers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadServers();
  }, []);

  // const handleJoinServer = (serverId) => {
  //   console.log('Joining server with ID:', serverId);
  //   const serverToJoin = servers.find(server => server._id === serverId);
  //   if (serverToJoin) {
  //     console.log('Joining server:', serverToJoin);
  //     // Implement your join logic here
  //   } else {
  //     console.error('Server not found for ID:', serverId);
  //   }
  // };

  const handleJoinServer = async (serverId) =>{
    try{
      const response = await joinServer(serverId);
      console.log('joined server resposne :' , response);

      // const socket = getSocket();
      // socket.connect();
      // socket.emit('joined-server' , serverId);
      navigate(`/server/${serverId}`);
    }
    catch(error){
      console.error("Error joining server:", error);
      setError(error.message || 'Failed to join server. Please try again.');
    }
  }
  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <Page title="All Servers | Discord Clone">
      <AllServersContainer>
        <Typography variant="h4" gutterBottom>All Servers</Typography>
        {servers.length === 0 ? (
          <Typography>No servers available to join.</Typography>
        ) : (
          <List>
            {servers.map((server) => (
              <ListItem key={server._id}>
                <ListItemText primary={server.name} />
                <JoinButton 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleJoinServer(server._id)}
                >
                  Join
                </JoinButton>
              </ListItem>
            ))}
          </List>
        )}
      </AllServersContainer>
    </Page>
  );
};

export default AllServers;