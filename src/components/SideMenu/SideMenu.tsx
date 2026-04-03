import { useEffect } from 'react';
import { Home, Settings, Mail } from 'lucide-react';
import './SideMenu.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fixedEls = document.querySelectorAll<HTMLElement>('.language-switcher');

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      fixedEls.forEach(el => { el.style.paddingRight = `${scrollbarWidth}px`; });
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      fixedEls.forEach(el => { el.style.paddingRight = ''; });
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      fixedEls.forEach(el => { el.style.paddingRight = ''; });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const scrollToElement = (selector: string) => {
    // Close menu first
    onClose();

    // Wait for menu close animation, then scroll
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (!element) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  const handleHome = () => {
    onClose();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  };

  const handleHowItWorks = () => {
    scrollToElement('.main-content');
  };

  const handleContact = () => {
    scrollToElement('.contact');
  };

  return (
    <>
      <div className={`menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>
          <span></span>
          <span></span>
        </button>

        <nav className="menu-nav">
          <button className="menu-item" onClick={handleHome}>
            <span className="menu-item-icon"><Home size={20} /></span>
            <span className="menu-item-label">{t.menu.home}</span>
          </button>
          <button className="menu-item" onClick={handleHowItWorks}>
            <span className="menu-item-icon"><Settings size={20} /></span>
            <span className="menu-item-label">{t.menu.howItWorks}</span>
          </button>
          <button className="menu-item" onClick={handleContact}>
            <span className="menu-item-icon"><Mail size={20} /></span>
            <span className="menu-item-label">{t.menu.contact}</span>
          </button>
        </nav>

        <div className="side-menu-logo">
          <span className="side-menu-logo-sida">SIDA</span>
          <span className="side-menu-logo-media">MEDIA</span>
        </div>
      </div>
    </>
  );
}
