import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Editor from './components/Editor';
import './App.css';

function App() {
  const [openFiles, setOpenFiles] = useState(['about_me.md']);
  const [activeFile, setActiveFile] = useState('about_me.md');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenFile = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
  };

  const handleCloseFile = (e, fileName) => {
    e.stopPropagation(); // Prevent triggering tab click
    const newOpenFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newOpenFiles);

    if (activeFile === fileName) {
      if (newOpenFiles.length > 0) {
        setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
      } else {
        setActiveFile(null); // No files open
      }
    }
  };

  return (
    <Layout
      activeFile={activeFile}
      setActiveFile={handleOpenFile}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      <Editor
        activeFile={activeFile}
        openFiles={openFiles}
        setActiveFile={setActiveFile}
        onCloseFile={handleCloseFile}
      />
    </Layout>
  );
}

export default App;
