import React from 'react';
import { useTheme } from '../theme/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * Header - Top navigation with brand, search, filter, and theme switch.
 */
export default function Header({ onSearch, onFilterChange, currentFilter }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="Task Manager">
          <div className="brand-badge">TM</div>
          <div className="brand-title">Task Manager</div>
          <span className="badge" style={{ marginLeft: 8 }}>Ocean Professional</span>
        </div>

        <div className="header-actions" role="search">
          <input
            className="input"
            type="search"
            placeholder="Search tasks..."
            aria-label="Search tasks"
            onChange={(e) => onSearch(e.target.value)}
          />

          <div className="segmented" role="tablist" aria-label="Filter tasks">
            {['all', 'active', 'completed'].map(key => (
              <button
                key={key}
                role="tab"
                aria-selected={currentFilter === key}
                className={currentFilter === key ? 'active' : ''}
                onClick={() => onFilterChange(key)}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <button
            className="btn btn-ghost"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
