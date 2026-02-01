import { useEffect } from 'react';
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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
            {t.menu.home}
          </button>
          <button className="menu-item" onClick={handleHowItWorks}>
            {t.menu.howItWorks}
          </button>
          <button className="menu-item" onClick={handleContact}>
            {t.menu.contact}
          </button>
        </nav>
      </div>
    </>
  );
}
