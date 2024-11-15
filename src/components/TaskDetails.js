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
        const encodedAddress = encodeURIComponent(task.location);
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <div className="task-details" onClick={() => setShowMenu(false)}>
            <div className="task-header">
                <div className="task-title-section">
                    <div className="task-title-main">
                        <h2>{task.projectName}</h2>
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
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                </svg>
                            </button>
                            {showMenu && (
                                <div className="menu-dropdown">
                                    <button onClick={() => handleMenuItemClick('complete')}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Mark Complete
                                    </button>
                                    <button onClick={() => handleMenuItemClick('photo')}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                            <circle cx="12" cy="13" r="4"/>
                                        </svg>
                                        Attach Photo
                                    </button>
                                    <button onClick={() => handleMenuItemClick('note')}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                        Leave Note
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="task-subtitle">
                        <span className="client-name">{task.clientName}</span>
                    </div>
                    <div className="task-meta-info">
                        <div className="meta-item">
                            <span className="meta-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            </span>
                            <span className="meta-text">{task.date}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                            </span>
                            <span className="meta-text">{task.time}</span>
                        </div>
                        <div className="meta-item location">
                            <span className="meta-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </span>
                            <span className="meta-text">{task.location}</span>
                            <button 
                                className="navigation-button"
                                onClick={handleNavigationClick}
                                title="Open in Google Maps"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Task Details</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Task ID:</label>
                        <span>{task.id}</span>
                    </div>
                    <div className="info-item">
                        <label>Type:</label>
                        <span>{task.taskType}</span>
                    </div>
                    <div className="info-item">
                        <label>Duration:</label>
                        <span>{task.estimatedDuration}</span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h3>Contact Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Name:</label>
                        <span>{task.contactName}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone:</label>
                        <a href={`tel:${task.contactNumber}`}>{task.contactNumber}</a>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <a href={`mailto:${task.contactEmail}`}>{task.contactEmail}</a>
                    </div>
                </div>
            </div>

            {task.notes && (
                <div className="detail-section">
                    <h3>Notes</h3>
                    <div className="notes-list">
                        {Array.isArray(task.notes) ? (
                            task.notes.map((note, index) => (
                                <div key={index} className="note-item">
                                    <div className="note-text">{note.text}</div>
                                    <div className="note-timestamp">
                                        {new Date(note.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="note-item">
                                <div className="note-text">{task.notes}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="detail-section">
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
                    {Array.isArray(task.installerNotes) && task.installerNotes.length > 0 ? (
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
                            No installer notes added yet.
                        </div>
                    )}
                </div>
            </div>

            {task.attachments && task.attachments.length > 0 && (
                <div className="info-section">
                    <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                        </svg>
                        Attachments
                    </h3>
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