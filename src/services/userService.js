const API_URL = 'http://localhost:3002';

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  createUser: async (user) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          createdAt: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id, user) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          updatedAt: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  validateLogin: async (username, password) => {
    try {
      console.log('Validating login for username:', username); // Debug log
      const response = await fetch(`${API_URL}/users?username=${encodeURIComponent(username)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users = await response.json();
      console.log('Found users:', users); // Debug log
      
      const user = users.find(u => u.username === username);
      
      if (user && user.password === password) {
        console.log('Login successful for user:', user.username); // Debug log
        return {
          success: true,
          user: {
            id: user.id,
            username: user.username,
            userType: user.userType,
            fullName: user.fullName
          }
        };
      }
      
      console.log('Login failed: Invalid credentials'); // Debug log
      return { success: false };
    } catch (error) {
      console.error('Error validating login:', error);
      throw error;
    }
  }
}; 