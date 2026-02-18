import './Contact.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';
import instagramIcon from '../../assets/instagram.png';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section className="contact">
      <div className="contact-wrapper">
        <h2 className="contact-title">{t.contact.title}</h2>
        <p className="contact-subtitle">{t.contact.subtitle}</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>{t.contact.email}</h3>
            <a href="mailto:hello@sida.com" className="contact-link">{t.contact.emailAddress}</a>
          </div>
          
          <div className="contact-item">
            <h3>{t.contact.phone}</h3>
            <a href="tel:+1234567890" className="contact-link">{t.contact.phoneNumber}</a>
          </div>
          
          <div className="contact-item">
            <h3>{t.contact.instagram}</h3>
            <a href={t.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="contact-link instagram-link">
              <img src={instagramIcon} alt="Instagram" className="instagram-icon" />
              <span>@sida_media_</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
