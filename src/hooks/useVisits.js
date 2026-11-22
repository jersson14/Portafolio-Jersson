import { useEffect, useState } from 'react';

/* Una sola llamada por carga de página, aunque el componente se monte más de una vez. */
let pending = null;

const register = () => {
  pending ??= fetch('/api/visits', { method: 'POST' })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => (data?.enabled && Number.isFinite(data.total) ? data : null))
    .catch(() => null);
  return pending;
};

/* Registra la visita y devuelve { total, today }, o null si el contador no está disponible. */
export const useVisits = () => {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    let alive = true;
    register().then((data) => alive && setVisits(data));
    return () => { alive = false; };
  }, []);

  return visits;
};
