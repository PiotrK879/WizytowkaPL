import './MainContent.css';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export default function MainContent() {
  const { language } = useLanguage();
  const t = translations[language];

  type MainStep = {
    number: string;
    title: string;
    content: string[];
    variant?: 'bullets';
  };

  const steps: MainStep[] = [
    t.mainContent.stepOne,
    t.mainContent.stepTwo,
    t.mainContent.stepThree,
    t.mainContent.stepFour,
    t.mainContent.stepFive,
    t.mainContent.stepSix,
    t.mainContent.stepSeven,
  ] as MainStep[];
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
          <p className="main-highlight">{t.mainContent.mainHighlight}</p>
          <p className="main-summary">{t.mainContent.mainSummary}</p>
          <div className="divider"></div>
        </div>

        <div className="steps-section">
          {steps.map((step, stepIndex) => (
            <div className="step" key={stepIndex}>
              <div className="step-header-wrapper">
                <div className="step-header">
                  <span className="step-number">{step.number}</span>
                  {step.title && <h2 className="step-title">{step.title}</h2>}
                </div>
                <div className="step-divider"></div>
              </div>

              <div className="step-content">
                {step.variant === 'bullets' ? (
                  <ul className="step-list">
                    {step.content.map((text: string, index: number) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                ) : (
                  step.content.map((text: string, index: number) => <p key={index}>{text}</p>)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}