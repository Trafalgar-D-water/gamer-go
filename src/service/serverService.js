const API_URL = "http://localhost:3004/api";

export const fetchUSerServers = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`${API_URL}/guild/get-all-server`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure you're returning an array of server objects
    return data.allServer || data.ownedServer || data.joinedServer || [];
  } catch (error) {
    console.error("Error fetching servers:", error);
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Other error:", error.message);
    }
    return []; // Return an empty array if there's an error
  }
};


export const fetchAllServers = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`${API_URL}/guilds`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the guilds data
    return data.data || [];
  } catch (error) {
    console.error("Error fetching all servers:", error);
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Other error:", error.message);
    }
    throw error; // Rethrow the error so it can be handled by the component
  }
};