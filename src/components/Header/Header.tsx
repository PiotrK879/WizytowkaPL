import './Header.css';
import headerLogo from '../../assets/headerlog.png';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const scrollToElement = (selector: string, duration: number) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const handleGetStarted = () => {
    scrollToElement('.main-content', 1000);
  };

  const handleContact = () => {
    scrollToElement('.contact', 2000);
  };

  return (
    <header className="header">
      <div className="header-content">
        <img src={headerLogo} alt="SIDA" className="header-logo" />

        <div className="header-main">
          <h2 className="header-title">
            {t.header.title}<br />
            {t.header.titleSecond}
          </h2>

          <p className="header-subtitle">
            {t.header.subtitle}<br />
            {t.header.subtitleSecond}
          </p>
        </div>

        <div className="header-buttons">
          <button className="header-cta" onClick={handleGetStarted}>{t.header.getStarted}</button>
          <button className="header-contact-btn" onClick={handleContact}>{t.header.contact}</button>
        </div>
      </div>
    </header>
  );
}