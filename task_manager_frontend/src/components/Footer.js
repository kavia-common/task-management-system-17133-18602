import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer - Minimal footer with note.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <small>
        © {year} Task Manager • Ocean Professional Theme • Blue & Amber accents
      </small>
    </footer>
  );
}
