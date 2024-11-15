import React from 'react';
import './DailyTasks.css';

const DailyTasks = ({ date, onTaskSelect, installerTasks }) => {
    // Format the date to match db.json format: YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    console.log('DailyTasks dateKey:', dateKey);
    console.log('DailyTasks available tasks:', installerTasks);
    
    const tasksForDay = installerTasks[dateKey] || [];
    console.log('Tasks for this day:', tasksForDay);

    return (
        <div className="daily-tasks">
            <h2>Tasks for {date.toLocaleDateString()}</h2>
            <div className="tasks-list">
                {tasksForDay.length > 0 ? (
                    tasksForDay.map(task => (
                        <div 
                            key={task.id} 
                            className={`task-card priority-${task.priority}`}
                            onClick={() => onTaskSelect(task)}
                        >
                            <div className="task-time">{task.time}</div>
                            <div className="task-main">
                                <h3>{task.projectName}</h3>
                                <p className="client-name">{task.clientName}</p>
                            </div>
                            <div className="task-meta">
                                <span className={`status-badge ${task.status}`}>
                                    {task.status}
                                </span>
                                <span className="duration">{task.estimatedDuration}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-tasks-message">
                        No tasks scheduled for this day
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyTasks; 