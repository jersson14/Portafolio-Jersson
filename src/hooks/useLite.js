import { useSyncExternalStore } from 'react';

/* Celulares y tablets: menos efectos continuos para que todo vaya fluido. */
const QUERY = '(max-width: 768px), (pointer: coarse)';

const subscribe = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

export const isLite = () => window.matchMedia(QUERY).matches;
export const useLite = () => useSyncExternalStore(subscribe, isLite, () => false);
