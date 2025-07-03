import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [username, setUsername] = useLocalStorage('username', '');
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [activeFilter, setActiveFilter] = useState('all');

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true;
  });

  const login = (username) => {
    setUsername(username);
  };

  const logout = () => {
    setUsername('');
  };

  return (
    <TaskContext.Provider value={{
      username,
      tasks,
      filteredTasks,
      activeFilter,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion,
      setActiveFilter,
      login,
      logout,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);