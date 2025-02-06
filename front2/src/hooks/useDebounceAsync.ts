import { useState, useEffect, useRef } from "react";

type TimerInfo = {
  timer: NodeJS.Timeout;
  callback: () => void;
};

export const useDebouncedInputValues = (
  initialValues: Record<number, string>,
  delay: number
) => {
  const [inputValues, setInputValues] = useState<Record<number, string>>(initialValues);
  const [debouncedValues, setDebouncedValues] = useState<Record<number, string>>(initialValues);
  const [debouncedKey, setDebouncedKey] = useState<number | null>(null);
  const [debouncedValue, setDebouncedValueState] = useState<string | null>(null);
  const [hasPendingDebounces, setHasPendingDebounces] = useState(false);

  // We store for each key an object holding the timer and its callback.
  const timers = useRef<Record<number, TimerInfo>>({});

  const setDebouncedValue = (key: number, value: string) => {
    // Update the immediate (non-debounced) value.
    setInputValues((prev) => ({ ...prev, [key]: value }));

    // Flush (reschedule with 0 delay) pending debounces for other keys.
    Object.keys(timers.current).forEach((timerKeyStr) => {
      const timerKey = Number(timerKeyStr);
      if (timerKey !== key) {
        clearTimeout(timers.current[timerKey].timer);
        timers.current[timerKey].timer = setTimeout(() => {
          timers.current[timerKey].callback();
          delete timers.current[timerKey];
          setHasPendingDebounces(Object.keys(timers.current).length > 0);
        }, 0);
      }
    });

    // Clear any existing timer for this key.
    if (timers.current[key]) {
      clearTimeout(timers.current[key].timer);
    }

    // Define the callback to run when the debounce delay is over.
    const callback = () => {
      setDebouncedValues((prev) => ({ ...prev, [key]: value }));
      setDebouncedKey(key);
      setDebouncedValueState(value);
    };

    // Set a new timer for this key.
    timers.current[key] = {
      timer: setTimeout(() => {
        callback();
        delete timers.current[key];
        setHasPendingDebounces(Object.keys(timers.current).length > 0);
      }, delay),
      callback,
    };

    setHasPendingDebounces(true);
  };

  /**
   * Flush pending debounces.
   *
   * If a key is provided, flush only that key’s debounce.
   * Otherwise, flush all pending debounces.
   */
  const flushDebounce = (key?: number) => {
    if (typeof key === "number") {
      if (timers.current[key]) {
        clearTimeout(timers.current[key].timer);
        timers.current[key].callback();
        delete timers.current[key];
      }
    } else {
      Object.keys(timers.current).forEach((timerKeyStr) => {
        const timerKey = Number(timerKeyStr);
        clearTimeout(timers.current[timerKey].timer);
        timers.current[timerKey].callback();
        delete timers.current[timerKey];
      });
    }
    setHasPendingDebounces(Object.keys(timers.current).length > 0);
  };

  useEffect(() => {
    // On unmount, clean up all timers.
    return () => {
      Object.values(timers.current).forEach(({ timer }) => clearTimeout(timer));
      timers.current = {};
      setHasPendingDebounces(false);
    };
  }, []);

  return {
    inputValues,
    debouncedValues,
    debouncedKey,
    debouncedValue,
    setDebouncedValue,
    flushDebounce,
    hasPendingDebounces,
  };
};
