import { useState, useEffect } from "react";

/**
 * A custom hook that debounces a value.
 *
 * @param {any} value - The value to be debounced
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * // Then in a useEffect or elsewhere:
 * useEffect(() => {
 *   // Do something with debouncedSearchTerm
 *   // This will only run 500ms after the searchTerm stops changing
 * }, [debouncedSearchTerm]);
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes before the delay has passed
    // This ensures we only execute the most recent value after the delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
