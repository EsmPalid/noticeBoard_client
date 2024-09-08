import { useState, useCallback, useEffect } from "react";

const useResize = (initialState = 0) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        window.addEventListener("resize", onResize);
    });

    const onResize = useCallback((e) => {
        setState(document.documentElement.clientHeight);
    }, []);

    return [state];
};

export default useResize;
