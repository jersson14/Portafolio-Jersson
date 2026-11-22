import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useVisits } from '../hooks/useVisits';

const CountUp = ({ value, format }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const controls = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return <span ref={ref} aria-hidden="true" className="tabular-nums">{format(reduced ? value : shown)}</span>;
};

const VisitCounter = () => {
  const { t, language } = useLanguage();
  const visits = useVisits();
  if (!visits) return null;

  const format = (n) => n.toLocaleString(language === 'es' ? 'es-PE' : 'en-US');
  const label = t(visits.total === 1 ? 'footer.visit' : 'footer.visits');

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 rounded-full text-sm text-dark-300"
      style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.22)' }}
    >
      <FaEye aria-hidden="true" style={{ color: '#22d3ee' }} />
      <span>
        <span className="sr-only">{format(visits.total)}</span>
        <strong className="text-white font-semibold"><CountUp value={visits.total} format={format} /></strong> {label}
      </span>
      {visits.today > 0 && (
        <span className="text-dark-400">
          <span style={{ color: '#4ade80' }} aria-hidden="true">●</span> {format(visits.today)} {t('footer.today')}
        </span>
      )}
    </div>
  );
};

export default VisitCounter;
