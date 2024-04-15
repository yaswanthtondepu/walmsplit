import { useState, useEffect } from 'react';
export function useLocalStorage(key, initialDefault) {
    const [val, setVal] = useState(() => {
        const localStorageVal = localStorage.getItem(key);

        return localStorageVal !== null
            ? JSON.parse(localStorageVal)
            : initialDefault;
    });

    useEffect(() => {
        if (localStorage.getItem(key) === null) {
            setVal(initialDefault);
        }
    }, [key, initialDefault]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val));
    }, [val, key]);

    return [val, setVal];
}