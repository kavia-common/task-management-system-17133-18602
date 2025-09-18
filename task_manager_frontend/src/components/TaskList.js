import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TaskList - Renders a list of tasks with edit, delete, and complete toggle actions.
 */
export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (!tasks.length) {
    return <div className="badge" aria-live="polite">No tasks found.</div>;
  }

  return (
    <div>
      {tasks.map(task => (
        <article key={task.id} className="task-item" aria-label={`Task ${task.title}`}>
          <input
            className="checkbox"
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggleComplete(task)}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          />
          <div>
            <h3 className="task-title">
              {task.title}{' '}
              {task.priority && (
                <span className="badge" title={`Priority: ${task.priority}`}>
                  {task.priority}
                </span>
              )}
            </h3>
            {task.description && <p className="task-desc">{task.description}</p>}
            {task.dueDate && (
              <p className="task-desc">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
          </div>
          <div className="task-actions">
            <button className="btn btn-ghost" onClick={() => onEdit(task)} aria-label="Edit task">
              ✏️ Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              🗑 Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
