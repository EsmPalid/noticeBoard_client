import { useState, useCallback } from "react";

const useInput = (initialForm) => {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            setForm((form) => ({
                ...form,
                [name]: value,
            }));
        },
        [form]
    );

    return [form, onChange];
};

export default useInput;
