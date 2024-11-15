import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onDateSelect, selectedDate: propSelectedDate, installerTasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoverPosition, setHoverPosition] = useState(null);
    const [hoveredTasks, setHoveredTasks] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [currentWeek, setCurrentWeek] = useState(getWeekDates(new Date()));

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to get dates for the current week
    function getWeekDates(date) {
        const week = [];
        const current = new Date(date);
        current.setDate(current.getDate() - current.getDay()); // Start from Sunday
        
        for (let i = 0; i < 7; i++) {
            week.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return week;
    }

    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
        setCurrentWeek(getWeekDates(newDate));
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
        setCurrentWeek(getWeekDates(newDate));
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (date) => {
        onDateSelect(date);
    };

    const handleDayHover = (event, date, tasks) => {
        if (tasks && tasks.length > 0) {
            const rect = event.currentTarget.getBoundingClientRect();
            setHoverPosition({
                x: rect.left + window.scrollX,
                y: rect.bottom + window.scrollY
            });
            setHoveredTasks(tasks);
        }
    };

    const handleDayLeave = () => {
        setHoverPosition(null);
        setHoveredTasks(null);
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && 
               date.getMonth() === today.getMonth() && 
               date.getFullYear() === today.getFullYear();
    };

    const renderWeekView = () => {
        return currentWeek.map((date, index) => {
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const dayTasks = installerTasks[dateString] || [];
            const hasTasks = dayTasks.length > 0;
            const hasHighPriority = dayTasks.some(task => task.priority === 'high');
            
            const isSelected = propSelectedDate && 
                date.getDate() === propSelectedDate.getDate() &&
                date.getMonth() === propSelectedDate.getMonth() &&
                date.getFullYear() === propSelectedDate.getFullYear();
            
            return (
                <div 
                    key={index}
                    className={`calendar-day 
                        ${isToday(date) ? 'today' : ''} 
                        ${isSelected ? 'selected' : ''}
                        ${hasTasks ? 'has-tasks' : ''}`
                    }
                    onClick={() => handleDayClick(date)}
                    onMouseEnter={(e) => handleDayHover(e, date, dayTasks)}
                    onMouseLeave={handleDayLeave}
                >
                    <span className="day-number">{date.getDate()}</span>
                    {hasTasks && (
                        <div className="task-indicators">
                            <span className={`task-dot ${hasHighPriority ? 'high-priority' : ''}`} />
                            <span className="task-count">+{dayTasks.length}</span>
                        </div>
                    )}
                </div>
            );
        });
    };

    const renderMonthView = () => {
        const days = [];
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();
        
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
            const dayTasks = installerTasks[dateString] || [];
            const hasTasks = dayTasks.length > 0;
            const hasHighPriority = dayTasks.some(task => task.priority === 'high');
            
            const isSelected = propSelectedDate && 
                day === propSelectedDate.getDate() &&
                currentDate.getMonth() === propSelectedDate.getMonth() &&
                currentDate.getFullYear() === propSelectedDate.getFullYear();
            
            days.push(
                <div 
                    key={day} 
                    className={`calendar-day 
                        ${isToday(date) ? 'today' : ''} 
                        ${isSelected ? 'selected' : ''}
                        ${hasTasks ? 'has-tasks' : ''}`
                    }
                    onClick={() => handleDayClick(date)}
                    onMouseEnter={(e) => handleDayHover(e, date, dayTasks)}
                    onMouseLeave={handleDayLeave}
                >
                    <span className="day-number">{day}</span>
                    {hasTasks && (
                        <div className="task-indicators">
                            <span className={`task-dot ${hasHighPriority ? 'high-priority' : ''}`} />
                            <span className="task-count">+{dayTasks.length}</span>
                        </div>
                    )}
                </div>
            );
        }
        
        return days;
    };

    return (
        <div className={`calendar ${isMobile ? 'weekly-view' : ''}`}>
            <div className="calendar-header">
                <div className="month-navigator">
                    <button 
                        className="nav-button" 
                        onClick={isMobile ? handlePrevWeek : handlePrevMonth}
                    >&lt;</button>
                    <button 
                        className="nav-button" 
                        onClick={isMobile ? handleNextWeek : handleNextMonth}
                    >&gt;</button>
                </div>
                <h2>
                    {isMobile 
                        ? `Week of ${currentWeek[0].toLocaleDateString()}`
                        : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                    }
                </h2>
            </div>
            <div className="calendar-weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="calendar-days">
                {isMobile ? renderWeekView() : renderMonthView()}
            </div>
            {hoveredTasks && hoverPosition && (
                <div 
                    className="task-preview"
                    style={{
                        position: 'absolute',
                        left: `${hoverPosition.x}px`,
                        top: `${hoverPosition.y}px`
                    }}
                >
                    {hoveredTasks.map(task => (
                        <div 
                            key={task.id} 
                            className={`preview-task ${task.isPartOfMultiDay ? 'multi-day-task' : ''}`}
                        >
                            <div className="preview-time">{task.time}</div>
                            <div className="preview-details">
                                <div className="preview-title">{task.projectName}</div>
                                <div className="preview-client">{task.clientName}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calendar;
