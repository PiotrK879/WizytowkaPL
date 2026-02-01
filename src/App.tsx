import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Contact from './components/Contact/Contact';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import './App.css';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';

declare global {
  interface Window {
    particlesJS: any;
  }
}

function AppContent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS.load('particles-js', '/particles.json', () => {
          console.log('Particles.js loaded');
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="app">
      <div id="particles-js" className="particles-container"></div>
      <LanguageSwitcher />
      <Header />
      <MainContent />
      <Contact />
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