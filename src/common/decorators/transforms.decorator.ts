import { Transform } from 'class-transformer';
import { castArray, isNil, trim } from 'lodash';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @returns void
 */
export function Trim() {
  return Transform(params => {
    const value = params.value;

    if (Array.isArray(value)) {
      return value.map(v => trim(v).replace(/\s\s+/g, ' '));
    }

    return trim(value).replace(/\s\s+/g, ' ');
  });
}

/**
 * @description convert string or number to integer.
 * @returns void
 */
export function ToInt() {
  return Transform(
    params => {
      const value = params.value;

      return parseInt(value, 10);
    },
    {
      toClassOnly: true
    }
  );
}

/**
 * @description transforms to array, specially for query params.
 * @returns void
 */
export function ToArray() {
  return Transform(
    params => {
      const value = params.value;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    {
      toClassOnly: true
    }
  );
}
