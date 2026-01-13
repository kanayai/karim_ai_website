import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Editor from './components/Editor';
import { themes } from './constants/themes';
import { useRecentFiles } from './hooks/useRecentFiles';
import { ToastProvider, useToast } from './contexts/ToastContext';
import './App.css';
import TrustModal from './components/TrustModal';

function AppContent() {
  const [openFiles, setOpenFiles] = useState(['Welcome']);
  const [activeFile, setActiveFile] = useState('Welcome');

  // Trust State
  const [trustState, setTrustState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('trust_state') || 'unknown';
    }
    return 'unknown';
  });

  const handleTrust = () => {
    localStorage.setItem('trust_state', 'trusted');
    setTrustState('trusted');
  };

  const handleDistrust = () => {
    localStorage.setItem('trust_state', 'untrusted');
    setTrustState('untrusted');
  };

  const handleManageTrust = () => {
    setTrustState('unknown');
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      // Migration: 'dark' used to be VS Code Dark, now we want to default to GitHub Dark for it
      // or effectively "reset" old users to the new default.
      if (savedTheme === 'dark' || !savedTheme) {
        return 'github-dark';
      }
      return savedTheme;
    }
    return 'github-dark';
  });
  // Use useLayoutEffect to update the DOM synchronously before browser paint/iframe load
  React.useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Initialize based on window width
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return true;
  });
  // Simple Mode state: Default to false
  const [simpleMode, setSimpleMode] = useState(false);

  // Recent files tracking
  const { recentFiles, addRecentFile } = useRecentFiles();

  // Toast notifications
  const toast = useToast();

  // Track previous theme for toast notification
  const prevThemeRef = React.useRef(theme);
  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      const currentTheme = themes.find(t => t.id === theme);
      if (currentTheme && prevThemeRef.current) {
        toast.showSuccess(`Theme changed to ${currentTheme.name}`);
      }
      prevThemeRef.current = theme;
    }
  }, [theme, toast]);

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
    setSimpleMode(prev => {
      const newValue = !prev;
      // Use setTimeout to defer toast to after state update
      setTimeout(() => {
        toast.showInfo(newValue ? 'Simple mode enabled' : 'Simple mode disabled');
      }, 0);
      return newValue;
    });
    // If entering simple mode, ensure sidebar is closed on mobile to avoid clutter
    if (!simpleMode && window.innerWidth <= 768) {
      // Optional: logic to close sidebar if needed
    }
  };

  const handleOpenFile = (fileName) => {
    const isNewFile = !openFiles.includes(fileName);
    if (isNewFile) {
      setOpenFiles(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
    // Track recent files
    addRecentFile(fileName);
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
    // Defer toast to avoid render phase update
    setTimeout(() => {
      toast.showInfo(`Closed ${fileName}`);
    }, 0);
  };

  const handleCloseAllFiles = () => {
    const closedCount = openFiles.length;
    setOpenFiles(['Welcome']);
    setActiveFile('Welcome');
    if (closedCount > 1) {
      // Defer toast to avoid render phase update
      setTimeout(() => {
        toast.showInfo(`Closed ${closedCount} files`);
      }, 0);
    }
  };

  return (
    <>
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
        isRestricted={trustState === 'untrusted'}
        onManageTrust={handleManageTrust}
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
          recentFiles={recentFiles}
        />
      </Layout>
      {trustState === 'unknown' && (
        <TrustModal onTrust={handleTrust} onDistrust={handleDistrust} />
      )}
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
