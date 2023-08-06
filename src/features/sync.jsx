import { useEffect, useState } from 'react';

export function CreateSyncArray(array) {
  const [arrayValue, setArrayValue] = useState(array.toArray());
  useEffect(() => {
    const handler = () => setArrayValue(array);
    array.observe(handler);
    return () => {
      array.unobserve(handler);
    };
  });
  return arrayValue;
}

export const getBoxData = (map, keys) =>
  keys.reduce((data, key) => ({ ...data, [key]: map.get(key) }), {});
