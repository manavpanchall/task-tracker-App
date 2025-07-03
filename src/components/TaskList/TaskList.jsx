import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = () => {
  const { filteredTasks } = useTasks();

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Add a new task to get started!</p>
        </div>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;