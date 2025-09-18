# Task Manager Frontend (React) - Ocean Professional Theme

Modern, lightweight React frontend for managing tasks (view, create, update, delete) with an Ocean Professional theme using blue and amber accents.

## Features

- Dashboard layout with:
  - Task creation/editing form
  - Task list panel (filter by All/Active/Completed, search)
- REST API integration using fetch:
  - Endpoints: `/tasks` (GET, POST), `/tasks/:id` (PUT, DELETE)
- Ocean Professional theme:
  - Rounded corners, subtle shadows, gradients, smooth transitions
  - Blue (#2563EB) and Amber (#F59E0B) accents
- Accessible controls and keyboard-friendly UI

## Getting Started

Install dependencies and start:

```
npm install
npm start
```

Open http://localhost:3000

## Environment

Create a `.env` file at the project root (or use `.env.local`) and set:

```
REACT_APP_API_BASE_URL=http://localhost:4000
```

See `.env.example` for details.

## Project Structure

- src/
  - App.js: Main dashboard and state orchestration
  - App.css: Ocean Professional theme and components
  - components/
    - Header.js, Footer.js, TaskList.js, TaskForm.js
  - services/
    - api.js: REST API helpers
  - theme/
    - ThemeContext.js: Theme provider and hook

## Testing

```
npm test
```

## Notes

- The backend REST API should be available at `REACT_APP_API_BASE_URL`.
- Typical task object shape:
  ```
  { id: string|number, title: string, description?: string, priority?: 'Low'|'Medium'|'High'|'Urgent', dueDate?: ISOString, completed: boolean }
  ```
