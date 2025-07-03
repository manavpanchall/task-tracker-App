import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskFilter.css';

const TaskFilter = () => {
  const { activeFilter, setActiveFilter, tasks } = useTasks();

  const countAll = tasks.length;
  const countCompleted = tasks.filter(task => task.completed).length;
  const countPending = tasks.filter(task => !task.completed).length;

  return (
    <div className="task-filter">
      <button
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => setActiveFilter('all')}
      >
        All ({countAll})
      </button>
      <button
        className={`filter-button ${activeFilter === 'completed' ? 'active' : ''}`}
        onClick={() => setActiveFilter('completed')}
      >
        Completed ({countCompleted})
      </button>
      <button
        className={`filter-button ${activeFilter === 'pending' ? 'active' : ''}`}
        onClick={() => setActiveFilter('pending')}
      >
        Pending ({countPending})
      </button>
    </div>
  );
};

export default TaskFilter;