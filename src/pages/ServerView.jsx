import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Page from '../components/Page';
import { fetchUSerServers as fetchUserServers } from '../service/serverService';
import ServerContent from '../components/server/ServerContent';


const ServerView = () => {
  const { serverId } = useParams();
  const [servers, setServers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    const loadServers = async () => {
      try {
        setIsLoading(true);
        const userServers = await fetchUserServers();
        setServers(userServers);
        if (serverId) {
          const server = userServers.find(s => s._id === serverId);
          if (server) {
            setSelectedServer(server);
          }
        }
      } catch (error) {
        console.error('Failed to load servers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadServers();
  }, [serverId]);

  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  const handleAddServer = (newServer) => {
    setServers(prevServers => [...prevServers, newServer]);
  };

  return (
    <Page title={`Server ${serverId} | Discord Clone`}>
      <DashboardLayout
        servers={servers}
        onServerSelect={handleServerSelect}
        onAddServer={handleAddServer}
        isLoading={isLoading}
        // selectedServer={selectedServer}
      >
        {/* Add your server view content here */}
        {/* <h1>Server {serverId}</h1> */}
        <ServerContent server={selectedServer} />
      </DashboardLayout>
    </Page>
  );
};

export default ServerView;