import React from 'react';
import NavLink from './NavLink';

// Temporary Teaching page while the Moodle look-alike (revamp plan M4) is built.
const TeachingHolding = ({ setActiveFile }) => (
  <div className="journal-standalone-shell">
    <header className="journal-standalone-topbar">
      <NavLink file="Welcome" onNavigate={setActiveFile}>Back to OS</NavLink>
    </header>
    <main className="teaching-holding">
      <h1>Teaching</h1>
      <p>This section is being redesigned. Course materials are on the University of Bath Moodle.</p>
    </main>
  </div>
);

export default TeachingHolding;
