import './LanguageSwitcher.css';
import flagEn from '../../assets/england.png';
import flagPl from '../../assets/poland.png';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [backgroundImage, setBackgroundImage] = useState<string>(flagEn);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  useEffect(() => {
    if (language === 'en') {
      setBackgroundImage(flagEn);
    } else {
      setBackgroundImage(flagPl);
    }
  }, [language]);

    const buttonStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', 
    }


  return (
    <div className="language-switcher">
      <button
        style={buttonStyle}
        className={`toggle-button ${language}`}
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        <div className="toggle-circle"></div>
      </button>
    </div>
  );
}
