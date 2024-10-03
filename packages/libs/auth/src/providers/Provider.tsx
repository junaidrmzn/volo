import type { ReactNode } from "react";
import { match } from "ts-pattern";
import type { Config } from "../authConfig";
import { MsalProviderWrapper as MsalProvider } from "./MsalProvider";
import { StaticProvider } from "./StaticProvider";

export type ProviderProps = {
    config?: Config;
    onLogin: (props: {
        getAccessToken: () => Promise<string>;
        logout: () => void;
        email: string;
        name: string;
        groups: string[];
        userId: string;
        sessionId: string;
    }) => void;
    children: ReactNode;
};

export const Provider = (props: ProviderProps) => {
    const { config } = props;

    return match(config)
        .with(undefined, () => null)
        .with({ type: "msal" }, () => <MsalProvider {...props} config={config!} />)
        .with({ type: "static" }, () => <StaticProvider {...props} />)
        .exhaustive();
};
