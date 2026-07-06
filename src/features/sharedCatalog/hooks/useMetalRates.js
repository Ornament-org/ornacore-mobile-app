import { useCallback, useEffect, useMemo, useState } from 'react';
import catalogService from '../services/catalogService';

export const useMetalRates = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    catalogService
      .getMetalRates()
      .then(setRates)
      .catch(() => setRates([]));
  }, []);

  const rateFor = useCallback(
    (metalId) => rates.find((rate) => rate.metalId === metalId) ?? null,
    [rates],
  );

  return useMemo(() => ({ rates, rateFor }), [rates, rateFor]);
};

export default useMetalRates;
