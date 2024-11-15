import React from 'react';
import './DailyTasks.css';

const DailyTasks = ({ date, onTaskSelect, installerTasks }) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    const tasksForDay = installerTasks[dateKey] || [];

    return (
        <div className="daily-tasks">
            <h2>Tasks for {date.toLocaleDateString()}</h2>
            <div className="tasks-list">
                {tasksForDay.length > 0 ? (
                    tasksForDay.map(task => (
                        <div 
                            key={task.id} 
                            className={`task-card ${task.priority}`}
                            onClick={() => onTaskSelect(task)}
                        >
                            <div className="task-time-container">
                                <span className="task-time">{task.time}</span>
                                <span className="task-duration">4 hours</span>
                            </div>
                            <div className="task-content">
                                <div className="task-type-badge">
                                    {task.taskType}
                                </div>
                                <div className="task-info">
                                    <div className="task-client">{task.clientCompany}</div>
                                    <div className="task-location">{task.siteLocation}</div>
                                </div>
                                <div className="task-meta">
                                    {task.installerNotes && task.installerNotes.length > 0 && (
                                        <span className="notes-count">
                                            {task.installerNotes.length} note(s)
                                        </span>
                                    )}
                                    <span className={`priority-indicator ${task.priority}`}>
                                        {task.priority}
                                    </span>
                                </div>
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