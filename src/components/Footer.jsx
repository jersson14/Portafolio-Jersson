import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaHeart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      className="relative z-10"
      style={{
        background: 'rgba(2,4,15,0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(6,182,212,0.12)',
      }}
    >
      {/* Neon top line */}
      <div
        className="absolute top-0 inset-x-0"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #06b6d4 30%, #a855f7 70%, transparent 100%)',
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6">

          {/* Logo */}
          <motion.div
            className="font-display font-bold text-2xl"
            style={{
              background: 'linear-gradient(135deg, #22d3ee, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            whileHover={{ scale: 1.05 }}
          >
            JCM
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { href: 'https://github.com/jersson14', icon: FaGithub, label: 'GitHub', color: '#e2e8f0' },
              { href: 'https://www.linkedin.com/in/jersson-corilla-miranda-3020bb200/', icon: FaLinkedin, label: 'LinkedIn', color: '#22d3ee' },
              { href: 'https://wa.me/51974031318', icon: FaWhatsapp, label: 'WhatsApp', color: '#4ade80' },
            ].map(({ href, icon: Icon, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color,
                }}
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div
            className="w-24 rounded-full"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)',
            }}
          />

          {/* Copyright */}
          <div className="text-center space-y-1">
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} Jersson Jorge Corilla Miranda.{' '}
              <span style={{ color: '#475569' }}>{t('footer.rights')}</span>
            </p>
            <p
              className="text-xs flex items-center justify-center gap-1.5"
              style={{ color: '#334155' }}
            >
              {t('footer.developed_by')}
              <FaHeart style={{ color: '#06b6d4', fontSize: '10px' }} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
