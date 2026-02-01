import './MainContent.css';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export default function MainContent() {
  const { language } = useLanguage();
  const t = translations[language];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const steps = document.querySelectorAll('.step');
    steps.forEach((step) => observer.observe(step));

    return () => {
      steps.forEach((step) => observer.unobserve(step));
    };
  }, []);

  return (
    <section className="main-content">
      <div className="content-wrapper">
        <div className="intro-section">
          <h1 className="main-title">{t.mainContent.mainTitle}</h1>
          <p className="main-subtitle">{t.mainContent.mainSubtitle}</p>
          <div className="divider"></div>
        </div>

        <div className="steps-section">
          <div className="step">
            <div className="step-header-wrapper">
              <div className="step-header">
                <span className="step-number">{t.mainContent.stepOne.number}</span>
                <h2 className="step-title">{t.mainContent.stepOne.title}</h2>
              </div>
              <div className="step-divider"></div>
            </div>

            <div className="step-content">
              {t.mainContent.stepOne.content.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>

          <div className="step">
            <div className="step-header-wrapper">
              <div className="step-header">
                <span className="step-number">{t.mainContent.stepTwo.number}</span>
                <h2 className="step-title">{t.mainContent.stepTwo.title}</h2>
              </div>
              <div className="step-divider"></div>
            </div>

            <div className="step-content">
              {t.mainContent.stepTwo.content.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>

          <div className="step">
            <div className="step-header-wrapper">
              <div className="step-header">
                <span className="step-number">{t.mainContent.stepThree.number}</span>
                <h2 className="step-title">{t.mainContent.stepThree.title}</h2>
              </div>
              <div className="step-divider"></div>
            </div>

            <div className="step-content">
              {t.mainContent.stepThree.content.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}