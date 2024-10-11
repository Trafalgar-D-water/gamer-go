import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Page from '../components/Page';
import { fetchUSerServers as fetchUserServers, fetchServerMembers } from '../service/serverService';
import ServerContent from '../components/server/ServerContent';
import { getSocket } from '../config/socket.config';

const ServerView = () => {
  const { serverId } = useParams();
  const [servers, setServers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);
  const [onlineMembers, setOnlineMembers] = useState([]);

  useEffect(() => {
    const loadServerAndMembers = async () => {
      try {
        setIsLoading(true);
        const userServers = await fetchUserServers();
        setServers(userServers);
        
        if (serverId) {
          const server = userServers.find(s => s._id === serverId);
          if (server) {
            setSelectedServer(server);
            // Fetch members for this server
            const membersdata = await fetchServerMembers(serverId);
            setOnlineMembers(membersdata.data);
          }
        }
      } catch (error) {
        console.error('Failed to load server data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServerAndMembers();

    const socket = getSocket();
    socket.connect();
    socket.emit('joinServer', serverId);
    
    socket.on('memberJoined', (data) => {
      console.log('Member joined event received:', data);
      if (data.guildId === serverId) {
        setOnlineMembers(prevMembers => {
          // Check for duplicates
          if (!prevMembers.find(member => member.userId === data.newMember.userId)) {
            return [...prevMembers, data.newMember];
          }
          return prevMembers;
        });
      }
    });

    return () => {
      socket.off('memberJoined');
      socket.emit('leaveServer', serverId);
      socket.disconnect();
    };
  }, [serverId]);

  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  const handleAddServer = (newServer) => {
    setServers(prevServers => [...prevServers, newServer]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title={`Server ${serverId} | Discord Clone`}>
      <DashboardLayout
        servers={servers}
        onServerSelect={handleServerSelect}
        onAddServer={handleAddServer}
        isLoading={isLoading}
      >
        {selectedServer && (
          <ServerContent 
            server={selectedServer} 
            onlineMembers={onlineMembers} 
            setOnlineMembers={setOnlineMembers}
          />
        )}
      </DashboardLayout>
    </Page>
  );
};

export default ServerView;