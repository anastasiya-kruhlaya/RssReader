import { useState, useCallback } from 'react'


export function useForm(initial) {
    const [values, setValues] = useState(initial);
    const handleChange = useCallback(
        (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value })),
        []
    );
    const reset = useCallback(() => setValues(initial), [initial]);

    return { 
        values, 
        handleChange,
        reset,
        setValues
    };
}
