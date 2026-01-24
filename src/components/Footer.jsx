import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-white/10 bg-dark-950/50 backdrop-blur-xl relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="text-dark-400 text-sm">
                        © {new Date().getFullYear()} Jersson Jorge Corilla Miranda. {t('footer.rights')}
                    </p>
                    <p className="text-dark-500 text-xs mt-2">
                        {t('footer.developed_by')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
