import React, { useState } from 'react';
import './TaskDetailsPopup.css';

const TaskDetailsPopup = ({ task, onClose, onEdit, onDelete, onCreate, isCreating }) => {
  const [isEditing, setIsEditing] = useState(isCreating);
  const [editedTask, setEditedTask] = useState(task);

  if (!task) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreating) {
      await onCreate(editedTask);
    } else {
      await onEdit(editedTask);
    }
    setIsEditing(false);
  };

  const renderEditForm = () => (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-row">
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={editedTask.projectName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={editedTask.clientName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Name:</label>
          <input
            type="text"
            name="contactName"
            value={editedTask.contactName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={editedTask.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          value={editedTask.contactEmail}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={editedTask.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={editedTask.time}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Task Type:</label>
          <select
            name="taskType"
            value={editedTask.taskType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Network Installation">Network Installation</option>
            <option value="Security System">Security System</option>
            <option value="WiFi Setup">WiFi Setup</option>
            <option value="Server Maintenance">Server Maintenance</option>
            <option value="Phone System">Phone System</option>
            <option value="CCTV Installation">CCTV Installation</option>
            <option value="Access Control">Access Control</option>
            <option value="Fiber Optic Setup">Fiber Optic Setup</option>
          </select>
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleInputChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={editedTask.location}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Estimated Duration:</label>
        <input
          type="text"
          name="estimatedDuration"
          value={editedTask.estimatedDuration}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">Save Changes</button>
        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );

  const renderViewMode = () => (
    <>
      <div className="status-section">
        <div className={`status-badge ${task.priority}`}>
          {task.priority}
        </div>
        <div className={`status-badge ${task.status}`}>
          {task.status}
          {task.completedAt && (
            <span className="completion-date">
              {new Date(task.completedAt).toLocaleString()}
            </span>
          )}
        </div>
        <div className="popup-actions">
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="detail-section">
        <h3>Client Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Client Name:</label>
            <span>{task.clientName}</span>
          </div>
          <div className="detail-item">
            <label>Contact Name:</label>
            <span>{task.contactName}</span>
          </div>
          <div className="detail-item">
            <label>Contact Number:</label>
            <span>{task.contactNumber}</span>
          </div>
          <div className="detail-item">
            <label>Contact Email:</label>
            <span>{task.contactEmail}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Task Details</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Date:</label>
            <span>{task.date}</span>
          </div>
          <div className="detail-item">
            <label>Time:</label>
            <span>{task.time}</span>
          </div>
          <div className="detail-item">
            <label>Type:</label>
            <span>{task.taskType}</span>
          </div>
          <div className="detail-item">
            <label>Duration:</label>
            <span>{task.estimatedDuration}</span>
          </div>
          <div className="detail-item full-width">
            <label>Location:</label>
            <span>{task.location}</span>
          </div>
        </div>
      </div>

      {/* Regular Notes Section */}
      {task.notes && (
        <div className="detail-section">
          <h3>Notes</h3>
          <div className="notes-list">
            {Array.isArray(task.notes) ? (
              task.notes.map((note, index) => (
                <div key={index} className="note-item">
                  <p>{note.text}</p>
                  <span className="note-timestamp">
                    {new Date(note.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="note-item">
                <p>{task.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Installer's Notes Section */}
      <div className="detail-section">
        <h3>Installer's Notes</h3>
        {task.installerNotes && task.installerNotes.length > 0 ? (
          <div className="notes-list">
            {task.installerNotes.map((note, index) => (
              <div key={index} className="note-item">
                <p>{note.text}</p>
                <span className="note-timestamp">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-notes">No installer notes yet.</p>
        )}
      </div>

      {task.attachments && task.attachments.length > 0 && (
        <div className="detail-section">
          <h3>Attachments</h3>
          <div className="attachments-grid">
            {task.attachments.map((attachment, index) => (
              <div key={index} className="attachment-item">
                {attachment.type === 'image' && (
                  <img src={attachment.url} alt={attachment.name} />
                )}
                <span className="attachment-name">{attachment.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{isCreating ? 'Create New Task' : task.projectName}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="popup-body">
          {isEditing || isCreating ? renderEditForm() : renderViewMode()}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPopup; 