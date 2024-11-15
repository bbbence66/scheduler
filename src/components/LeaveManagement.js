import React, { useState } from 'react';
import './LeaveManagement.css';

const LeaveManagement = ({ onAddLeave, userLeaves }) => {
    const [showLeaveForm, setShowLeaveForm] = useState(false);
    const [leaveStart, setLeaveStart] = useState('');
    const [leaveEnd, setLeaveEnd] = useState('');
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveType, setLeaveType] = useState('full-day');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const leaveRequest = {
            startDate: leaveStart,
            endDate: leaveEnd,
            reason: leaveReason,
            type: leaveType,
            startTime: startTime,
            endTime: endTime,
            status: 'pending',
            id: `LEAVE-${Date.now()}`
        };
        onAddLeave(leaveRequest);
        resetForm();
    };

    const resetForm = () => {
        setShowLeaveForm(false);
        setLeaveStart('');
        setLeaveEnd('');
        setLeaveReason('');
        setLeaveType('full-day');
        setStartTime('');
        setEndTime('');
    };

    return (
        <div className="leave-management">
            <div className="leave-header">
                <h3>Leave Management</h3>
                <button 
                    className="add-leave-button"
                    onClick={() => setShowLeaveForm(true)}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Request Leave
                </button>
            </div>

            {showLeaveForm && (
                <form onSubmit={handleSubmit} className="leave-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Leave Type</label>
                            <select 
                                value={leaveType}
                                onChange={(e) => setLeaveType(e.target.value)}
                                required
                            >
                                <option value="full-day">Full Day</option>
                                <option value="time-slot">Time Slot</option>
                            </select>
                        </div>
                        {leaveType === 'time-slot' && (
                            <div className="form-group">
                                <label>Time</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required={leaveType === 'time-slot'}
                                        style={{ flex: 1 }}
                                    />
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required={leaveType === 'time-slot'}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                value={leaveStart}
                                onChange={(e) => setLeaveStart(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                value={leaveEnd}
                                onChange={(e) => setLeaveEnd(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Reason</label>
                        <textarea
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                            required
                            placeholder="Enter reason for leave"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-leave">Submit</button>
                        <button 
                            type="button" 
                            className="cancel-leave"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="leave-list">
                <h4>Upcoming Leaves</h4>
                {userLeaves && userLeaves.length > 0 ? (
                    userLeaves.map(leave => (
                        <div key={leave.id} className={`leave-item ${leave.status}`}>
                            <div className="leave-dates">
                                {new Date(leave.startDate).toLocaleDateString()}
                                {leave.type === 'time-slot' && ` ${leave.startTime}-${leave.endTime}`}
                            </div>
                            <div className="leave-reason">{leave.reason}</div>
                            <div className="leave-status">{leave.status}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-leaves">No leave requests</div>
                )}
            </div>
        </div>
    );
};

export default LeaveManagement; 