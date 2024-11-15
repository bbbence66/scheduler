const API_URL = 'http://localhost:3001';

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          notes: [],
          attachments: [],
          status: 'pending'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  markTaskComplete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const task = await response.json();

      // Update the task status and add completion date
      const updateResponse = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          status: 'completed',
          completedAt: new Date().toISOString()
        }),
      });
      
      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }
      
      return updateResponse.json();
    } catch (error) {
      console.error('Error marking task complete:', error);
      throw error;
    }
  },

  addNote: async (id, note, isInstallerNote = true) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const task = await response.json();

      // Determine which notes array to update
      const noteType = isInstallerNote ? 'installerNotes' : 'notes';
      const notes = Array.isArray(task[noteType]) ? task[noteType] : [];
      const updatedNotes = [...notes, { text: note, timestamp: new Date().toISOString() }];

      // Update the task with the new note
      const updateResponse = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          [noteType]: updatedNotes
        }),
      });
      
      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }
      
      return updateResponse.json();
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  addAttachment: async (id, file) => {
    try {
      // First get the current task
      const response = await fetch(`${API_URL}/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const task = await response.json();

      // Convert file to base64
      const base64File = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Add the new attachment
      const attachments = Array.isArray(task.attachments) ? task.attachments : [];
      const updatedAttachments = [...attachments, {
        type: 'image',
        url: base64File,
        name: file.name,
        timestamp: new Date().toISOString()
      }];

      // Update the task
      const updateResponse = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          attachments: updatedAttachments
        }),
      });
      
      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }
      
      return updateResponse.json();
    } catch (error) {
      console.error('Error adding attachment:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}; 