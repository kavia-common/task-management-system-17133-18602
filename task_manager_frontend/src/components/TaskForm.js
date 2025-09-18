import React, { useEffect, useMemo, useState } from 'react';

const defaultTask = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
  completed: false,
};

/**
 * PUBLIC_INTERFACE
 * TaskForm - Create or edit a task. When initialData provided, acts as edit form.
 */
export default function TaskForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultTask);
  const isEditing = useMemo(() => !!initialData, [initialData]);

  useEffect(() => {
    setForm(initialData ? {
      title: initialData.title || '',
      description: initialData.description || '',
      priority: initialData.priority || 'Medium',
      dueDate: initialData.dueDate ? initialData.dueDate.slice(0,10) : '',
      completed: !!initialData.completed,
    } : defaultTask);
  }, [initialData]);

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      // Ensure dueDate is ISO if provided
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };
    onSubmit(payload);
  }

  return (
    <div>
      <h2 className="panel-title" style={{ marginBottom: 10 }}>
        {isEditing ? 'Edit Task' : 'Create Task'}
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            type="text"
            placeholder="Enter task title"
            value={form.title}
            required
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input textarea"
            placeholder="Add a brief description"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </div>

        <div className="row">
          <div className="field">
            <label className="label" htmlFor="priority">Priority</label>
            <select
              id="priority"
              className="input select"
              value={form.priority}
              onChange={(e) => updateField('priority', e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div className="field">
            <label className="label" htmlFor="dueDate">Due date</label>
            <input
              id="dueDate"
              className="input"
              type="date"
              value={form.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <label className="label" htmlFor="completed" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              id="completed"
              type="checkbox"
              className="checkbox"
              checked={form.completed}
              onChange={(e) => updateField('completed', e.target.checked)}
            />
            Mark as completed
          </label>
        </div>

        <div className="form-actions">
          {isEditing && (
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
