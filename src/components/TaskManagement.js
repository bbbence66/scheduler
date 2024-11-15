import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import './TaskManagement.css';
import TaskDetailsPopup from './TaskDetailsPopup';

function TaskManagement() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      console.log('Fetched tasks:', data);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEditFromPopup = async (editedTask) => {
    try {
      await taskService.updateTask(editedTask.id, editedTask);
      await loadTasks();
      setSuccessMessage('Task updated successfully!');
      setSelectedTask(null);
      
      window.dispatchEvent(new Event('tasksUpdated'));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task: ' + error.message);
    }
  };

  const handleDeleteFromPopup = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        await loadTasks();
        setSelectedTask(null);
        setSuccessMessage('Task deleted successfully!');
        
        window.dispatchEvent(new Event('tasksUpdated'));
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task: ' + error.message);
      }
    }
  };

  const handleCreateNew = () => {
    const newTask = {
      id: `TASK-${Date.now()}`,
      projectName: '',
      clientName: '',
      contactName: '',
      contactNumber: '',
      contactEmail: '',
      time: '',
      priority: 'medium',
      taskType: '',
      location: '',
      estimatedDuration: '',
      notes: '',
      date: '',
      status: 'pending'
    };
    setSelectedTask(newTask);
    setIsCreating(true);
  };

  const handleCreateFromPopup = async (newTask) => {
    try {
      await taskService.createTask(newTask);
      await loadTasks();
      setSuccessMessage('Task created successfully!');
      setSelectedTask(null);
      setIsCreating(false);
      
      window.dispatchEvent(new Event('tasksUpdated'));
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task: ' + error.message);
    }
  };

  return (
    <>
      <div className="task-management">
        <div className="task-management-header">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => navigate('/')}
            >
              ← Back
            </button>
            <h2>Task Management</h2>
          </div>
          <button 
            className="create-task-btn"
            onClick={handleCreateNew}
          >
            Create New Task
          </button>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="tasks-list">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="task-item"
              onClick={() => setSelectedTask(task)}
            >
              <div className="task-item-header">
                <h4>{task.projectName}</h4>
                <div className="task-badges">
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                    {task.completedAt && (
                      <span className="completion-date">
                        {new Date(task.completedAt).toLocaleString()}
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <p className="client-name">{task.clientName}</p>
              <p className="task-datetime">{new Date(task.date).toLocaleDateString()} - {task.time}</p>
              
              <div className="task-meta-info">
                {task.installerNotes && task.installerNotes.length > 0 && (
                  <div className="task-installer-notes-count">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    <span>{task.installerNotes.length} Installer Note{task.installerNotes.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {task.attachments && task.attachments.length > 0 && (
                  <div className="task-attachments-count">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                    </svg>
                    <span>{task.attachments.length} Attachment{task.attachments.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setIsCreating(false);
          }}
          onEdit={handleEditFromPopup}
          onDelete={handleDeleteFromPopup}
          onCreate={handleCreateFromPopup}
          isCreating={isCreating}
        />
      )}
    </>
  );
}

export default TaskManagement; 