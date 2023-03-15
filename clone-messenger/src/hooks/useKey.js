import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export default function useKey(key, callback, dependencyList) {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        // console.log("useLayoutEffect");
        callbackRef.current = callback;
    }, [dependencyList]);
    const handle = useCallback(
        (event) => {
            if (event.code === key) {
                callbackRef.current(event);
            }
        },
        [key]
    );
    useEffect(() => {
        // console.log("useEffect");
        // callbackRef.current = callback;
        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [key]);
}
