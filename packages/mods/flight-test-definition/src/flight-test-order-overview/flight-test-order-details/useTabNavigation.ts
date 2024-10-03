import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@voloiq/routing";

const isValidNumber = (value: string | number) => {
    const number = Number(value);
    return !Number.isNaN(number) && Number.isInteger(number);
};

export const useTabNavigation = (queryParamKey: string = "tabId") => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get(queryParamKey);
    const defaultIndex = paramValue && isValidNumber(paramValue) ? Number(paramValue) : 0;

    const [currentIndex, setCurrentIndex] = useState(defaultIndex);

    useEffect(() => {
        if (paramValue && isValidNumber(paramValue)) setCurrentIndex(Number(paramValue));
        else setCurrentIndex(0);
    }, [location.search, paramValue, queryParamKey]);

    const handleTabChange = (index: number) => {
        queryParams.set(queryParamKey, String(index));
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
        setCurrentIndex(index);
    };

    return {
        currentIndex,
        handleTabChange,
    };
};
