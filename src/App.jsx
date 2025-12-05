import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Editor from './components/Editor';
import { themes } from './constants/themes';
import './App.css';

function App() {
  const [openFiles, setOpenFiles] = useState(['Welcome']);
  const [activeFile, setActiveFile] = useState('Welcome');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Initialize based on window width
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return true;
  });
  // Simple Mode state: Default to false
  const [simpleMode, setSimpleMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      // Circle through themes if toggled
      const currentIndex = themes.findIndex(t => t.id === prev);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex].id;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleSimpleMode = () => {
    setSimpleMode(prev => !prev);
    // If entering simple mode, ensure sidebar is closed on mobile to avoid clutter
    if (!simpleMode && window.innerWidth <= 768) {
      // Optional: logic to close sidebar if needed
    }
  };

  const handleOpenFile = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
    // On mobile, close sidebar after selecting a file
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleCloseFile = (e, fileName) => {
    e.stopPropagation(); // Prevent triggering tab click
    const newOpenFiles = openFiles.filter(f => f !== fileName);

    if (newOpenFiles.length === 0) {
      setOpenFiles(['Welcome']);
      setActiveFile('Welcome');
    } else {
      setOpenFiles(newOpenFiles);
      if (activeFile === fileName) {
        setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
      }
    }
  };

  const handleCloseAllFiles = () => {
    setOpenFiles(['Welcome']);
    setActiveFile('Welcome');
  };

  return (
    <Layout
      activeFile={activeFile}
      setActiveFile={handleOpenFile}
      theme={theme}
      toggleTheme={toggleTheme}
      setTheme={setTheme}
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      simpleMode={simpleMode}
      toggleSimpleMode={toggleSimpleMode}
    >
      <Editor
        activeFile={activeFile}
        openFiles={openFiles}
        setActiveFile={setActiveFile}
        onCloseFile={handleCloseFile}
        onCloseAllFiles={handleCloseAllFiles}
        theme={theme}
        setTheme={setTheme}
        simpleMode={simpleMode}
        toggleSimpleMode={toggleSimpleMode}
      />
    </Layout>
  );
}

export default App;
