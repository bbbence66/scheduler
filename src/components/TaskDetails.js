import React, { useState } from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task, onTaskComplete, onAddNote, onAddAttachment }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [newNote, setNewNote] = useState('');

    if (!task) {
        return (
            <div className="task-details">
                <div className="no-task-message">
                    <h2>No Task Selected</h2>
                    <p>Select a task from the daily view to see its details</p>
                </div>
            </div>
        );
    }

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        if (newNote.trim()) {
            onAddNote(task.id, newNote.trim(), true);
            setNewNote('');
            setShowNoteInput(false);
        }
    };

    const handleMenuItemClick = (action) => {
        switch(action) {
            case 'complete':
                onTaskComplete(task.id);
                break;
            case 'photo':
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        onAddAttachment(task.id, file);
                    }
                };
                input.click();
                break;
            case 'note':
                setShowNoteInput(true);
                break;
            default:
                break;
        }
        setShowMenu(false);
    };

    const handleNavigationClick = () => {
        const encodedAddress = encodeURIComponent(task.siteLocation);
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <div className="task-details" onClick={() => setShowMenu(false)}>
            <div className="task-header">
                <div className="task-title-section">
                    <div className="task-title-main">
                        <h2>{task.taskName}</h2>
                        <div className="header-actions">
                            <span className={`status-badge ${task.status}`}>
                                {task.status}
                            </span>
                            <span className={`priority-tag ${task.priority}`}>
                                {task.priority}
                            </span>
                            <button className="menu-button" onClick={handleMenuClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="6" r="1" />
                                    <circle cx="12" cy="18" r="1" />
                                </svg>
                            </button>
                            {showMenu && (
                                <div className="menu-dropdown">
                                    <button onClick={() => handleMenuItemClick('complete')}>
                                        Mark Complete
                                    </button>
                                    <button onClick={() => handleMenuItemClick('photo')}>
                                        Add Photo
                                    </button>
                                    <button onClick={() => handleMenuItemClick('note')}>
                                        Add Note
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Basic Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Task Type:</label>
                        <span>{task.taskType}</span>
                    </div>
                    <div className="info-item">
                        <label>Project Name:</label>
                        <span>{task.projectName}</span>
                    </div>
                    <div className="info-item">
                        <label>TLC Sales Order #:</label>
                        <span>{task.tlcSalesOrder}</span>
                    </div>
                    <div className="info-item">
                        <label>Installers Count:</label>
                        <span>{task.installersCount}</span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Schedule</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Start Date:</label>
                        <span>{new Date(task.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <label>End Date:</label>
                        <span>{new Date(task.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <label>Event Date:</label>
                        <span>{new Date(task.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <label>Time:</label>
                        <span>{task.time}</span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Client Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Client Company:</label>
                        <span>{task.clientCompany}</span>
                    </div>
                    <div className="info-item">
                        <label>Contact Name:</label>
                        <span>{task.contactName}</span>
                    </div>
                    <div className="info-item">
                        <label>Contact Email:</label>
                        <a href={`mailto:${task.contactEmail}`}>{task.contactEmail}</a>
                    </div>
                    <div className="info-item">
                        <label>Contact Mobile:</label>
                        <a href={`tel:${task.contactMobile}`}>{task.contactMobile}</a>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Location</h3>
                <div className="info-grid">
                    <div className="info-item full-width">
                        <label>Site Location:</label>
                        <div className="location-with-nav">
                            <span>{task.siteLocation}</span>
                            <button 
                                className="navigation-button" 
                                onClick={handleNavigationClick}
                                title="Get Directions"
                            >
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="32" 
                                    height="32" 
                                    fill="none" 
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="4" cy="4" r="3" />
                                    <circle cx="20" cy="20" r="3" />
                                    <path d="M4 7 L 20 17" strokeDasharray="4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Personnel</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Manager:</label>
                        <span>{task.manager}</span>
                    </div>
                    <div className="info-item">
                        <label>Coordinator:</label>
                        <span>{task.coordinator}</span>
                    </div>
                </div>
            </div>

            {task.notes && (
                <div className="info-section">
                    <h3>Notes</h3>
                    <div className="notes-box">
                        {task.notes}
                    </div>
                </div>
            )}

            <div className="info-section">
                <h3>Installer's Notes</h3>
                {showNoteInput && (
                    <form onSubmit={handleNoteSubmit} className="note-input-form">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Enter your note..."
                            rows="3"
                        />
                        <div className="note-actions">
                            <button type="submit" className="note-submit">Add Note</button>
                            <button 
                                type="button" 
                                className="note-cancel"
                                onClick={() => {
                                    setShowNoteInput(false);
                                    setNewNote('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
                <div className="notes-list">
                    {task.installerNotes && task.installerNotes.length > 0 ? (
                        task.installerNotes.map((note, index) => (
                            <div key={index} className="note-item">
                                <div className="note-text">{note.text}</div>
                                <div className="note-timestamp">
                                    {new Date(note.timestamp).toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="notes-box">
                            No installer notes yet
                        </div>
                    )}
                </div>
            </div>

            {task.attachments && task.attachments.length > 0 && (
                <div className="info-section">
                    <h3>Attachments</h3>
                    <div className="attachments-grid">
                        {task.attachments.map((attachment, index) => (
                            <div key={index} className="attachment-item">
                                <div className="attachment-preview">
                                    <img src={attachment.url} alt={attachment.name} />
                                </div>
                                <div className="attachment-info">
                                    <span className="attachment-name">{attachment.name}</span>
                                    <span className="attachment-time">
                                        {new Date(attachment.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails; 