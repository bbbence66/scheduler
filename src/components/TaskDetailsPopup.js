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
      <div className="form-section">
        <h3>Basic Information</h3>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleInputChange}
            required
          />
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
              <option value="Delivery">Delivery</option>
              <option value="Installation">Installation</option>
              <option value="Scoping">Scoping</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Decommission">Decommission</option>
            </select>
          </div>
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
        </div>
      </div>

      <div className="form-section">
        <h3>Client Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Client Company:</label>
            <input
              type="text"
              name="clientCompany"
              value={editedTask.clientCompany}
              onChange={handleInputChange}
              required
            />
          </div>
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
        </div>
        <div className="form-row">
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
          <div className="form-group">
            <label>Contact Mobile:</label>
            <input
              type="tel"
              name="contactMobile"
              value={editedTask.contactMobile}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Order Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>TLC Sales Order #:</label>
            <input
              type="text"
              name="tlcSalesOrder"
              value={editedTask.tlcSalesOrder}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Site Location:</label>
            <input
              type="text"
              name="siteLocation"
              value={editedTask.siteLocation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Schedule</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={editedTask.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={editedTask.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Event Date:</label>
            <input
              type="date"
              name="eventDate"
              value={editedTask.eventDate}
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
      </div>

      <div className="form-section">
        <h3>Personnel</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Manager:</label>
            <select
              name="manager"
              value={editedTask.manager}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Manager</option>
              <option value="Manager 1">Manager 1</option>
              <option value="Manager 2">Manager 2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Coordinator:</label>
            <select
              name="coordinator"
              value={editedTask.coordinator}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Coordinator</option>
              <option value="Coordinator 1">Coordinator 1</option>
              <option value="Coordinator 2">Coordinator 2</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Installers #:</label>
          <input
            type="number"
            name="installersCount"
            value={editedTask.installersCount}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Information</h3>
        <div className="form-group">
          <label>Details:</label>
          <textarea
            name="details"
            value={editedTask.details}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <div className="form-row">
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
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={editedTask.status}
              onChange={handleInputChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">
          {isCreating ? 'Create Task' : 'Save Changes'}
        </button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderViewMode = () => (
    <>
      <div className="task-header-section">
        <h3 className="task-title">{task.taskName || task.projectName}</h3>
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
      </div>

      <div className="detail-section">
        <h3>Basic Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Task Type:</label>
            <span>{task.taskType}</span>
          </div>
          <div className="detail-item">
            <label>Project Name:</label>
            <span>{task.projectName}</span>
          </div>
          <div className="detail-item">
            <label>TLC Sales Order #:</label>
            <span>{task.tlcSalesOrder}</span>
          </div>
          <div className="detail-item">
            <label>Installers Count:</label>
            <span>{task.installersCount}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Client Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Client Company:</label>
            <span>{task.clientCompany}</span>
          </div>
          <div className="detail-item">
            <label>Contact Name:</label>
            <span>{task.contactName}</span>
          </div>
          <div className="detail-item">
            <label>Contact Email:</label>
            <a href={`mailto:${task.contactEmail}`}>{task.contactEmail}</a>
          </div>
          <div className="detail-item">
            <label>Contact Mobile:</label>
            <a href={`tel:${task.contactMobile}`}>{task.contactMobile}</a>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Schedule</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Start Date:</label>
            <span>{new Date(task.startDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <label>End Date:</label>
            <span>{new Date(task.endDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <label>Event Date:</label>
            <span>{new Date(task.eventDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <label>Time:</label>
            <span>{task.time}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Location</h3>
        <div className="detail-grid">
          <div className="detail-item full-width">
            <label>Site Location:</label>
            <span>{task.siteLocation}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>Personnel</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Manager:</label>
            <span>{task.manager}</span>
          </div>
          <div className="detail-item">
            <label>Coordinator:</label>
            <span>{task.coordinator}</span>
          </div>
        </div>
      </div>

      {task.notes && (
        <div className="detail-section">
          <h3>Notes</h3>
          <div className="notes-box">
            {task.notes}
          </div>
        </div>
      )}

      <div className="detail-section">
        <h3>Installer's Notes</h3>
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
        <div className="detail-section">
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