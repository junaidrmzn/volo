import { dependencies as appShellDependencies } from "../../packages/libs/app-shell/package.json";

export const sharedDependencies = {
    ...appShellDependencies,
    react: {
        singleton: true,
        requiredVersion: "17.0.2",
    },
    "react-dom": {
        singleton: true,
        requiredVersion: "17.0.2",
    },
    "@tanstack/react-query": { singleton: true, requiredVersion: "4.26.1" },
};
