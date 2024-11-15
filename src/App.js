import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DailyTasks from './components/DailyTasks';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import LeaveManagement from './components/LeaveManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userLeaves, setUserLeaves] = useState([]);
  
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const savedUsername = localStorage.getItem('username');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUsername(savedUsername || 'admin');
    }
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  // Helper function to generate dates between start and end
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const generateDailyTasks = (day) => {
    const taskTypes = [
      { type: 'Network Installation', duration: '4 hours' },
      { type: 'Security System', duration: '5 hours' },
      { type: 'WiFi Setup', duration: '3 hours' },
      { type: 'Server Maintenance', duration: '2 hours' },
      { type: 'Phone System', duration: '3 hours' },
      { type: 'CCTV Installation', duration: '6 hours' },
      { type: 'Access Control', duration: '4 hours' },
      { type: 'Fiber Optic Setup', duration: '5 hours' }
    ];

    const clients = [
      { name: 'Tech Solutions Inc', location: '350 5th Avenue, New York, NY 10118' },
      { name: 'City Bank', location: '388 Greenwich St, New York, NY 10013' },
      { name: 'Medical Center', location: '462 1st Avenue, New York, NY 10016' },
      { name: 'Retail Mall', location: '10 Columbus Circle, New York, NY 10019' },
      { name: 'School District', location: '52 Chambers St, New York, NY 10007' },
      { name: 'Office Complex', location: '601 Lexington Ave, New York, NY 10022' },
      { name: 'Data Corp', location: '111 8th Avenue, New York, NY 10011' },
      { name: 'Security Firm', location: '250 Greenwich St, New York, NY 10007' }
    ];

    const timeSlots = [
      '08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', 
      '02:45 PM', '04:00 PM', '05:30 PM'
    ];

    const priorities = ['high', 'medium', 'low'];
    const numTasks = Math.floor(Math.random() * 2) + 4; // 4-5 tasks
    const dayTasks = [];

    // Sort time slots randomly for the day
    const availableTimeSlots = [...timeSlots]
      .sort(() => Math.random() - 0.5)
      .slice(0, numTasks);

    for (let i = 0; i < numTasks; i++) {
      const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
      const client = clients[Math.floor(Math.random() * clients.length)];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];

      dayTasks.push({
        id: `INST-${day.toString().padStart(2, '0')}-${i + 1}`,
        projectName: `${client.name} ${taskType.type}`,
        clientName: client.name,
        contactName: `Contact ${i + 1}`,
        contactNumber: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        contactEmail: `contact${i + 1}@${client.name.toLowerCase().replace(/\s+/g, '')}.com`,
        time: availableTimeSlots[i],
        priority: priority,
        status: 'pending',
        taskType: taskType.type,
        location: client.location,
        estimatedDuration: taskType.duration,
        notes: `${taskType.type} for ${client.name}. Standard installation and configuration procedures apply.`,
        date: `2024-11-${day}`
      });
    }

    return dayTasks.sort((a, b) => {
      return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
    });
  };

  const generateNovemberTasks = () => {
    const tasks = {};
    
    // Generate 4-5 tasks for each day in November
    for (let day = 1; day <= 30; day++) {
      const dateKey = `2024-11-${day}`;
      tasks[dateKey] = generateDailyTasks(day);
    }

    // Add multi-day tasks
    multiDayTasks.forEach(task => {
      const dates = getDatesInRange(new Date(task.startDate), new Date(task.endDate));
      dates.forEach(date => {
        const dateKey = `2024-11-${date.getDate()}`;
        if (!tasks[dateKey]) {
          tasks[dateKey] = [];
        }
        tasks[dateKey].push({
          ...task,
          isPartOfMultiDay: true,
          isStart: date.getDate() === new Date(task.startDate).getDate(),
          isEnd: date.getDate() === new Date(task.endDate).getDate()
        });
      });
    });

    return tasks;
  };

  // Multi-day installations
  const multiDayTasks = [
    {
      id: 'INST-MULTI-1',
      projectName: 'Corporate Network Infrastructure',
      clientName: 'Enterprise Solutions Ltd',
      contactName: 'Robert Chen',
      contactNumber: '+1 555-123-4567',
      contactEmail: 'r.chen@enterprise.com',
      priority: 'high',
      status: 'pending',
      taskType: 'Network Installation',
      location: '350 5th Avenue, New York, NY 10118',
      startDate: '2024-11-5',
      endDate: '2024-11-8',
      time: '09:00 AM',
      estimatedDuration: '4 days',
      notes: 'Complete network infrastructure setup for 5 floors. Includes cable installation, network configuration, and testing.'
    },
    {
      id: 'INST-MULTI-2',
      projectName: 'Hospital Security System',
      clientName: 'City General Hospital',
      contactName: 'Dr. Sarah Miller',
      contactNumber: '+1 555-987-6543',
      contactEmail: 's.miller@citygeneral.com',
      priority: 'high',
      status: 'pending',
      taskType: 'Security Installation',
      location: '462 1st Avenue, New York, NY 10016',
      startDate: '2024-11-15',
      endDate: '2024-11-18',
      time: '08:00 AM',
      estimatedDuration: '4 days',
      notes: 'Hospital-wide security system installation including CCTV, access control, and emergency response systems.'
    },
    {
      id: 'INST-MULTI-3',
      projectName: 'Data Center Migration',
      clientName: 'Tech Solutions Inc',
      contactName: 'James Wilson',
      contactNumber: '+1 555-456-7890',
      contactEmail: 'j.wilson@techsolutions.com',
      priority: 'high',
      status: 'pending',
      taskType: 'Data Center',
      location: '111 8th Avenue, New York, NY 10011',
      startDate: '2024-11-20',
      endDate: '2024-11-23',
      time: '07:00 AM',
      estimatedDuration: '4 days',
      notes: 'Complete data center migration including server relocation, network setup, and system testing.'
    }
  ];

  // Now initialize the states
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [installerTasks, setInstallerTasks] = useState(generateNovemberTasks());

  // Add this function to handle task completion
  const handleTaskComplete = (taskId) => {
    setInstallerTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      // Loop through all dates
      Object.keys(newTasks).forEach(date => {
        // Find and update the task
        newTasks[date] = newTasks[date].map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'completed' };
          }
          return task;
        });
      });
      return newTasks;
    });

    // Update selected task if it's the one being completed
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => ({ ...prev, status: 'completed' }));
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const tasksForDay = installerTasks[dateKey] || [];
    if (tasksForDay.length > 0) {
      setSelectedTask(tasksForDay[0]);
    } else {
      setSelectedTask(null);
    }
  };

  const handleAddNote = (taskId, note) => {
    setInstallerTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      // Loop through all dates
      Object.keys(newTasks).forEach(date => {
        // Find and update the task
        newTasks[date] = newTasks[date].map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              notes: Array.isArray(task.notes) 
                ? [...task.notes, { text: note, timestamp: new Date().toISOString() }]
                : [{ text: note, timestamp: new Date().toISOString() }]
            };
          }
          return task;
        });
      });
      return newTasks;
    });

    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => ({
        ...prev,
        notes: Array.isArray(prev.notes)
          ? [...prev.notes, { text: note, timestamp: new Date().toISOString() }]
          : [{ text: note, timestamp: new Date().toISOString() }]
      }));
    }
  };

  const handleAddAttachment = (taskId, file) => {
    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setInstallerTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        Object.keys(newTasks).forEach(date => {
          newTasks[date] = newTasks[date].map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                attachments: Array.isArray(task.attachments)
                  ? [...task.attachments, { 
                      type: 'image',
                      url: reader.result,
                      name: file.name,
                      timestamp: new Date().toISOString()
                    }]
                  : [{ 
                      type: 'image',
                      url: reader.result,
                      name: file.name,
                      timestamp: new Date().toISOString()
                    }]
              };
            }
            return task;
          });
        });
        return newTasks;
      });

      // Update selected task if it's the one being modified
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prev => ({
          ...prev,
          attachments: Array.isArray(prev.attachments)
            ? [...prev.attachments, { 
                type: 'image',
                url: reader.result,
                name: file.name,
                timestamp: new Date().toISOString()
              }]
            : [{ 
                type: 'image',
                url: reader.result,
                name: file.name,
                timestamp: new Date().toISOString()
              }]
        }));
      }
    };
    reader.readAsDataURL(file);
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
          <h1>Schedule App</h1>
          <div className="user-section">
            <div className="welcome-message">
              <span className="greeting">Welcome back,</span>
              <span className="username">{username}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>
      
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
          <Calendar 
            onDateSelect={handleDateSelect} 
            selectedDate={selectedDate}
            installerTasks={installerTasks}
            userLeaves={userLeaves}
          />
          <DailyTasks 
            date={selectedDate} 
            onTaskSelect={handleTaskSelect}
            installerTasks={installerTasks}
            userLeaves={userLeaves}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 