import './Contact.css';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';
import instagramIcon from '../../assets/instagram.png';
import { motion } from 'framer-motion';

const EMAILJS_SERVICE_ID = 'service_ejyewms';
const EMAILJS_TEMPLATE_ID = 'template_1yzbttj';
const EMAILJS_PUBLIC_KEY = 'ABn8VC-5gsrt4jccR';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

function FloatingField({
  label,
  name,
  type = 'text',
  required,
  isTextarea,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const lifted = focused || hasValue;

  const commonProps = {
    name,
    required,
    className: 'form-input',
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
    },
  };

  return (
    <div className={`floating-field${focused ? ' focused' : ''}`}>
      {isTextarea ? (
        <textarea {...commonProps} rows={rows ?? 5} className="form-input form-textarea" />
      ) : (
        <input {...commonProps} type={type} />
      )}
      <label className={`floating-label${lifted ? ' lifted' : ''}`}>{label}</label>
      <span className="field-line"></span>
    </div>
  );
}

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact">
      <div className="contact-wrapper">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="contact-title" variants={fadeUp}>{t.contact.title}</motion.h2>
          <motion.p className="contact-subtitle" variants={fadeUp}>{t.contact.subtitle}</motion.p>

          <motion.div className="contact-info" variants={fadeUp}>
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
          </motion.div>

          <motion.div className="contact-form-wrapper" variants={fadeUp}>
            <h3 className="contact-form-title">{t.contact.formTitle}</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <FloatingField label={t.contact.formName} name="name" required />
              <FloatingField label={t.contact.formEmail} name="email" type="email" required />
              <FloatingField label={t.contact.formMessage} name="message" required isTextarea rows={5} />

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="form-submit"
                whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' ? (
                  <span className="submit-loading">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </span>
                ) : (
                  t.contact.formSend
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  className="form-status form-status--success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {t.contact.formSuccess}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className="form-status form-status--error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {t.contact.formError}
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
