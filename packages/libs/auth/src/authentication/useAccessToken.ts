import { useEffect, useState } from "react";
import { useAuthentication } from "./useAuthentication";

export const useAccessToken = () => {
    const { getAccessToken } = useAuthentication();
    const [accessToken, setAccessToken] = useState<string>("");

    useEffect(() => {
        getAccessToken().then(setAccessToken);
    }, [getAccessToken, setAccessToken]);

    return { accessToken };
};
