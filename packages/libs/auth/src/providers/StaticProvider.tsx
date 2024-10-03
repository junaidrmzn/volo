import { useEffect } from "react";
import type { ProviderProps } from "./Provider";

export const StaticProvider: FCC<ProviderProps> = (props) => {
    const { children, onLogin } = props;

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    useEffect(() => {
        onLogin({
            getAccessToken: () => Promise.resolve("volomockedtoken"),
            logout: () => {},
            email: "john.doe@gmail.com",
            name: "John Doe",
            groups: ["Admin"],
            userId: "00000000-0000-0000-0000-000000000000",
            sessionId: "00000000-0000-0000-0000-000000000000",
        });
    }, [onLogin]);

    return <>{children}</>;
};
