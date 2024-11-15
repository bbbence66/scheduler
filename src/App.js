import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DailyTasks from './components/DailyTasks';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import LeaveManagement from './components/LeaveManagement';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import TaskManagement from './components/TaskManagement';
import { taskService } from './services/taskService';
import UserManagement from './components/UserManagement';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userLeaves, setUserLeaves] = useState([]);
  const [installerTasks, setInstallerTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showManagementMenu, setShowManagementMenu] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');
  
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const savedUsername = localStorage.getItem('username');
    const savedUserType = localStorage.getItem('userType');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUsername(savedUsername || '');
      setUserType(savedUserType || '');
    }
  }, []);

  useEffect(() => {
    loadTasks();
    
    // Listen for task updates from TaskManagement component
    const handleTasksUpdated = () => {
      loadTasks();
    };

    window.addEventListener('tasksUpdated', handleTasksUpdated);
    return () => window.removeEventListener('tasksUpdated', handleTasksUpdated);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.management-dropdown')) {
        setShowManagementMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await taskService.getAllTasks();
      const tasksByDate = tasks.reduce((acc, task) => {
        const dateKey = task.date;
        
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(task);
        return acc;
      }, {});
      
      console.log('Loaded tasks by date:', tasksByDate);
      setInstallerTasks(tasksByDate);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleLogin = (user, type) => {
    setIsAuthenticated(true);
    setUsername(user);
    setUserType(type);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user);
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserType('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const handleTaskComplete = async (taskId) => {
    try {
      await taskService.markTaskComplete(taskId);
      await loadTasks(); // Reload all tasks
      
      // Update selected task if it's the one being completed
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prev => ({ ...prev, status: 'completed' }));
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    console.log('Selected date key:', dateKey);
    console.log('All available tasks:', installerTasks);
    console.log('Tasks for selected day:', installerTasks[dateKey]);
    
    const tasksForDay = installerTasks[dateKey] || [];
    if (tasksForDay.length > 0) {
      setSelectedTask(tasksForDay[0]);
    } else {
      setSelectedTask(null);
    }
  };

  const handleAddNote = async (taskId, note, isInstallerNote = true) => {
    try {
      await taskService.addNote(taskId, note, isInstallerNote);
      await loadTasks();
      
      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = await taskService.getAllTasks()
          .then(tasks => tasks.find(t => t.id === taskId));
        setSelectedTask(updatedTask);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleAddAttachment = async (taskId, file) => {
    try {
      await taskService.addAttachment(taskId, file);
      await loadTasks(); // Reload all tasks
      
      // Update selected task if it's the one being modified
      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = await taskService.getAllTasks()
          .then(tasks => tasks.find(t => t.id === taskId));
        setSelectedTask(updatedTask);
      }
    } catch (error) {
      console.error('Error adding attachment:', error);
    }
  };

  const handleAddLeave = (leaveRequest) => {
    setUserLeaves(prev => [...prev, leaveRequest]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Installation Schedule</h1>
          <div className="user-section">
            <div className="welcome-message">
              <span className="greeting">Welcome back,</span>
              <span className="username">{username}</span>
            </div>
            {userType === 'admin' && (
              <div className="management-dropdown">
                <button 
                  className="management-button"
                  onClick={() => setShowManagementMenu(!showManagementMenu)}
                >
                  Management
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {showManagementMenu && (
                  <div className="dropdown-menu">
                    <button onClick={() => {
                      navigate('/task-management');
                      setShowManagementMenu(false);
                    }}>
                      Task Management
                    </button>
                    <button onClick={() => {
                      navigate('/user-management');
                      setShowManagementMenu(false);
                    }}>
                      User Management
                    </button>
                  </div>
                )}
              </div>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <Routes>
        <Route 
          path="/task-management" 
          element={
            userType === 'admin' ? (
              <TaskManagement />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/user-management" 
          element={
            userType === 'admin' ? (
              <UserManagement />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route path="/" element={
          <div className="tab-content">
            <div className="left-panel">
              <TaskDetails 
                task={selectedTask} 
                onTaskComplete={handleTaskComplete}
                onAddNote={handleAddNote}
                onAddAttachment={handleAddAttachment}
              />
              <LeaveManagement 
                onAddLeave={handleAddLeave}
                userLeaves={userLeaves}
              />
            </div>
            <div className="right-panel">
              {console.log('Rendering Calendar with tasks:', installerTasks)}
              <Calendar 
                onDateSelect={handleDateSelect} 
                selectedDate={selectedDate}
                installerTasks={installerTasks}
                userLeaves={userLeaves}
              />
              {console.log('Rendering DailyTasks with date:', selectedDate)}
              {console.log('and tasks:', installerTasks)}
              <DailyTasks 
                date={selectedDate} 
                onTaskSelect={handleTaskSelect}
                installerTasks={installerTasks}
                userLeaves={userLeaves}
              />
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

// Wrap the App component with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper; 