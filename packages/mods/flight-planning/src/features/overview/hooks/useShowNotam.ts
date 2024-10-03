import { useState } from "react";
import { useLocation } from "@voloiq/routing";

export const useShowNotam = () => {
    const location = useLocation();
    const defaultValue = location.pathname.endsWith("/notams");
    const [showNotam, setShowNotam] = useState(defaultValue);

    return {
        showNotam,
        setShowNotam,
    };
};
