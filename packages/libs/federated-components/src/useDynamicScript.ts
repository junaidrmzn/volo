import { useEffect, useRef, useState } from "react";

export const useDynamicScript = (url: string) => {
    const urlCacheRef = useRef(new Set());
    const [ready, setReady] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() => {
        const { current: urlCache } = urlCacheRef;
        if (!url) return () => {};

        if (urlCache.has(url)) {
            setReady(true);
            setErrorLoading(false);
            return () => {};
        }

        setReady(false);
        setErrorLoading(false);

        const element = document.createElement("script");

        element.src = url;
        element.type = "text/javascript";
        element.async = true;

        element.addEventListener("load", () => {
            urlCache.add(url);
            setReady(true);
        });

        element.addEventListener("error", () => {
            setReady(false);
            setErrorLoading(true);
        });

        document.head.append(element);

        return () => {
            urlCache.delete(url);
            element.remove();
        };
    }, [url]);

    return {
        errorLoading,
        ready,
    };
};
