import { useEffect } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Contact from './components/Contact/Contact';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';

declare global {
  interface Window {
    particlesJS: (id: string, config: object) => void;
  }
}

function AppContent() {
  useEffect(() => {
    fetch('/particles.json')
      .then(r => r.json())
      .then(config => {
        if (window.particlesJS) {
          window.particlesJS('particles-js', config);
        }
      });
  }, []);

  return (
    <div className="app">
      <div className="app-bg" aria-hidden="true">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>
      <div id="particles-js" className="particles-layer" aria-hidden="true"></div>
      <div className="app-content">
        <LanguageSwitcher />
        <Header />
        <MainContent />
        <Contact />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;