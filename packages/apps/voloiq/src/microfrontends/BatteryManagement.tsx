import { Suspense, lazy } from "react";
import { LoadingScreen } from "./LoadingScreen";

const Microfrontend = lazy(async () => {
    const { App } = await import("@voloiq/battery-management");
    return { default: App };
});

export const BatteryManagement = () => (
    <Suspense fallback={<LoadingScreen />}>
        <Microfrontend />
    </Suspense>
);
