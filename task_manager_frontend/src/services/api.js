const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * Helper to handle JSON responses and HTTP errors.
 */
async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchTasks() {
  /** Fetch all tasks from backend. */
  return http('/tasks', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function createTask(payload) {
  /** Create a task on backend. Expected fields: title, description, priority, dueDate, completed. */
  return http('/tasks', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function updateTask(id, payload) {
  /** Update a task by id. */
  return http(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function deleteTask(id) {
  /** Delete a task by id. */
  return http(`/tasks/${id}`, { method: 'DELETE' });
}
