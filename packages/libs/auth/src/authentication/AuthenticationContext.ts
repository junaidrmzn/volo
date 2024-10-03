import { createContext } from "react";

export type AuthenticationContextValue = {
    getAccessToken: () => Promise<string>;
    logout: () => void;
    userId: string;
    email: string;
    name: string;
    sessionId: string;
};

export const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined);
