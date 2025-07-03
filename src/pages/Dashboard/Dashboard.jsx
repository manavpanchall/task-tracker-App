import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import TaskFilter from '../../components/TaskFilter/TaskFilter';
import './Dashboard.css';

const Dashboard = () => {
  const { username, logout } = useTasks();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard">
      <Header username={username} onLogout={handleLogout} />
      <main className="dashboard-content">
        <div className="dashboard-container">
          <TaskForm />
          <TaskFilter />
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;