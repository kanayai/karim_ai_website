import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Editor from './components/Editor';
import MinimalHome from './components/MinimalHome';
import GitHubLayout from './components/GitHubLayout';
import TeachingHolding from './components/TeachingHolding';
import WikiLayout from './components/WikiLayout';
import { themes } from './constants/themes';
import useSiteMode from './hooks/useSiteMode';
import { useRecentFiles } from './hooks/useRecentFiles';
import { ToastProvider, useToast } from './contexts/ToastContext';
import './App.css';
import MobileNav from './components/MobileNav';
import NavLink from './components/NavLink';
import { journalPosts, pathForFile, fileForPath, fileForHash, bioLangForPath, titleForFile } from './routes';
import { WIKI_LANG_KEY, initialWikiLang } from './constants/wikiStrings';

const blogFiles = ['blog.html', ...journalPosts];

const BlogViewer = React.lazy(() => import('./components/BlogViewer'));
const HtmlViewer = React.lazy(() => import('./components/HtmlViewer'));

function AppContent() {
  // The address bar decides the first page; old #file links still work.
  const [initialFile] = useState(() => fileForHash(window.location.hash) ?? fileForPath(window.location.pathname) ?? 'Welcome');
  const [openFiles, setOpenFiles] = useState(() => (initialFile === 'Welcome' ? ['Welcome'] : ['Welcome', initialFile]));
  const [activeFile, setActiveFile] = useState(initialFile);

  // Bio language: the address wins (/bio English, /es/bio Spanish), else the saved choice.
  const [bioLang, setBioLangState] = useState(() => bioLangForPath(window.location.pathname) ?? initialWikiLang());
  const setBioLang = (code) => {
    setBioLangState(code);
    try { localStorage.setItem(WIKI_LANG_KEY, code); } catch { /* storage blocked */ }
  };

  // Keep the address bar in step with the open page (History API).
  const firstSyncRef = React.useRef(true);
  useEffect(() => {
    const path = pathForFile(activeFile, bioLang);
    if (path !== window.location.pathname || window.location.hash) {
      const method = firstSyncRef.current ? 'replaceState' : 'pushState';
      window.history[method](null, '', path);
    }
    firstSyncRef.current = false;
  }, [activeFile, bioLang]);

  // Tab title and page language follow the open page.
  useEffect(() => {
    document.title = titleForFile(activeFile, bioLang);
    document.documentElement.lang = activeFile === 'wiki.html' ? bioLang : 'en';
  }, [activeFile, bioLang]);

  // Back/forward buttons.
  useEffect(() => {
    const onPopState = () => {
      const file = fileForPath(window.location.pathname) ?? 'Welcome';
      const lang = bioLangForPath(window.location.pathname);
      if (lang) setBioLangState(lang);
      setOpenFiles(prev => (prev.includes(file) ? prev : [...prev, file]));
      setActiveFile(file);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || !savedTheme) {
        return 'vscode-dark';
      }
      return savedTheme;
    }
    return 'vscode-dark';
  });
  // Use useLayoutEffect to update the DOM synchronously before browser paint/iframe load
  React.useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  // GitHub-style pages follow the home page's light/dark choice (not saved as the VS Code theme).
  const [siteMode] = useSiteMode();
  const githubPage = ['projects.html', 'publications.html', 'phd_students.html', 'publications.R', 'git-graph'].includes(activeFile);
  const githubTheme = siteMode === 'light' ? 'github-light' : 'github-dark';
  React.useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', githubPage ? githubTheme : theme);
  }, [githubPage, githubTheme, theme]);
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

  // Determine layout type based on activeFile
  const getLayoutType = (file) => {
    if (file === 'Welcome') return 'desktop';
    if (file === 'wiki.html') return 'wiki';
    if (blogFiles.includes(file)) return 'journal';
    if (['projects.html', 'publications.html', 'phd_students.html', 'publications.R', 'git-graph'].includes(file)) {
      return 'github';
    }
    if (['current_courses.ipynb', 'previous_courses.ipynb'].includes(file)) {
      return 'teaching';
    }
    return 'vscode'; // Default VS Code theme
  };

  const layoutType = getLayoutType(activeFile);

  if (layoutType === 'desktop') {
    return <MinimalHome setActiveFile={handleOpenFile} />;
  }

  if (layoutType === 'github') {
    return (
      <>
        <GitHubLayout
          activeFile={activeFile}
          setActiveFile={handleOpenFile}
        >
          <Editor
            activeFile={activeFile}
            openFiles={openFiles}
            setActiveFile={handleOpenFile}
            onCloseFile={handleCloseFile}
            onCloseAllFiles={handleCloseAllFiles}
            theme={githubTheme}
            setTheme={setTheme}
            simpleMode={simpleMode}
            toggleSimpleMode={toggleSimpleMode}
            recentFiles={recentFiles}
            htmlAutoHeight
            bare
          />
        </GitHubLayout>
        <MobileNav activeFile={activeFile} onNavigate={handleOpenFile} />
      </>
    );
  }

  if (layoutType === 'wiki') {
    return (
      <>
        <WikiLayout setActiveFile={handleOpenFile} lang={bioLang} onLangChange={setBioLang} />
        <MobileNav activeFile={activeFile} onNavigate={handleOpenFile} />
      </>
    );
  }

  if (layoutType === 'teaching') {
    return (
      <>
        <TeachingHolding setActiveFile={handleOpenFile} />
        <MobileNav activeFile={activeFile} onNavigate={handleOpenFile} />
      </>
    );
  }

  if (layoutType === 'journal') {
    const isJournalHome = activeFile === 'blog.html';

    return (
      <>
        <div className="journal-standalone-shell">
          <header className="journal-standalone-topbar">
            <NavLink file="Welcome" onNavigate={handleOpenFile}>Back to OS</NavLink>
            <nav aria-label="Site sections">
              <NavLink file="projects.html" onNavigate={handleOpenFile}>Research</NavLink>
              <NavLink file="current_courses.ipynb" onNavigate={handleOpenFile}>Teaching</NavLink>
              <NavLink file="wiki.html" onNavigate={handleOpenFile}>Bio</NavLink>
              <NavLink file="contact.html" onNavigate={handleOpenFile}>Contact</NavLink>
            </nav>
          </header>
          <div className={`journal-standalone-content ${isJournalHome ? '' : 'reader-mode'}`}>
            <React.Suspense fallback={<div className="p-4" style={{ color: 'var(--vscode-text)' }}>Loading journal...</div>}>
              {isJournalHome ? (
                <BlogViewer setActiveFile={handleOpenFile} />
              ) : (
                <HtmlViewer
                  activeFile={activeFile}
                  theme={theme}
                  setActiveFile={handleOpenFile}
                  i18n={{ language: 'en' }}
                />
              )}
            </React.Suspense>
          </div>
        </div>
        <MobileNav activeFile={activeFile} onNavigate={handleOpenFile} />
      </>
    );
  }

  // Default VS Code layout
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
      >
        <Editor
          activeFile={activeFile}
          openFiles={openFiles}
          setActiveFile={handleOpenFile}
          onCloseFile={handleCloseFile}
          onCloseAllFiles={handleCloseAllFiles}
          theme={theme}
          setTheme={setTheme}
          simpleMode={simpleMode}
          toggleSimpleMode={toggleSimpleMode}
          recentFiles={recentFiles}
        />
      </Layout>
      <MobileNav activeFile={activeFile} onNavigate={handleOpenFile} />
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
