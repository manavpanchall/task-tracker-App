import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskItem.css';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const formattedDate = format(new Date(task.createdAt), 'MMM dd, yyyy h:mm a');

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
        />
      </div>
      <div className="task-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-input"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-textarea"
              rows="2"
            />
            <div className="edit-actions">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta">
              <span className="task-date">{formattedDate}</span>
              <div className="task-actions">
                <button onClick={() => setIsEditing(true)} className="edit-button">
                  Edit
                </button>
                <button onClick={handleDelete} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;