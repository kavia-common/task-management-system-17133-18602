import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './theme/ThemeContext';

/**
 * App - Main dashboard for the Task Manager frontend.
 * Implements Ocean Professional theme and provides CRUD interactions via REST API.
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [search, setSearch] = useState('');

  // Load tasks on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        if (isMounted) setTasks(data);
      } catch (e) {
        setError('Failed to load tasks.');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const filteredTasks = useMemo(() => {
    let t = tasks;
    if (filter === 'active') t = t.filter(x => !x.completed);
    if (filter === 'completed') t = t.filter(x => x.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      t = t.filter(x => x.title?.toLowerCase().includes(q) || x.description?.toLowerCase().includes(q));
    }
    return t;
  }, [tasks, filter, search]);

  // PUBLIC_INTERFACE
  async function handleCreate(form) {
    /**
     * Create a new task using the backend API and update local state.
     */
    try {
      setError(null);
      const created = await createTask(form);
      setTasks(prev => [created, ...prev]);
    } catch (e) {
      setError('Failed to create task.');
    }
  }

  // PUBLIC_INTERFACE
  async function handleUpdate(id, form) {
    /**
     * Update an existing task using the backend API and update local state.
     */
    try {
      setError(null);
      const updated = await updateTask(id, form);
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
      setEditing(null);
    } catch (e) {
      setError('Failed to update task.');
    }
  }

  // PUBLIC_INTERFACE
  async function handleDelete(id) {
    /**
     * Delete a task using the backend API and update local state.
     */
    try {
      setError(null);
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (e) {
      setError('Failed to delete task.');
    }
  }

  // PUBLIC_INTERFACE
  function toggleComplete(task) {
    /**
     * Optimistically toggle completion and sync with backend.
     */
    const optimistic = { ...task, completed: !task.completed };
    setTasks(prev => prev.map(t => (t.id === task.id ? optimistic : t)));
    updateTask(task.id, { completed: optimistic.completed }).catch(() => {
      // revert on failure
      setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));
      setError('Failed to toggle completion.');
    });
  }

  return (
    <ThemeProvider>
      <div className="ocean-app">
        <Header
          onSearch={setSearch}
          onFilterChange={setFilter}
          currentFilter={filter}
        />
        <main className="dashboard">
          <section className="panel panel-form">
            <TaskForm
              key={editing ? `edit-${editing.id}` : 'create'}
              initialData={editing}
              onCancel={() => setEditing(null)}
              onSubmit={(payload) =>
                editing ? handleUpdate(editing.id, payload) : handleCreate(payload)
              }
            />
            {error && <div className="alert error" role="alert">{error}</div>}
          </section>

          <section className="panel panel-list">
            <div className="panel-heading">
              <h2 className="panel-title">Tasks</h2>
              {loading && <div className="spinner" aria-label="Loading tasks" />}
            </div>
            <TaskList
              tasks={filteredTasks}
              onEdit={setEditing}
              onDelete={handleDelete}
              onToggleComplete={toggleComplete}
            />
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
