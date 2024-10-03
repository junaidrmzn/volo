declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const BACKEND_BASE_URL: string;
declare const FEEDBACK_URL: string;
declare const ANALYTICS_APP_URL: string;
declare const VOLOCITY_ANALYTICS_APP_URL: string;
declare const WEATHER_APP_URL: string;
declare const WEATHER_LIVE_APP_URL: string;
declare const WEATHER_FORECAST_APP_URL: string;
declare const BATTERY_DASHBOARD_URL: string;
declare const FLAGSMITH_BASE_URL: string;
declare const FLAGSMITH_ENVIRONMENT_ID: string;
declare const AZURE_DEVOPS_TOKEN: string;
declare const process = {
    env: {
        BACKEND_BASE_URL: string,
        FEEDBACK_URL: string,
        ANALYTICS_APP_URL: string,
        VOLOCITY_ANALYTICS_APP_URL: string,
        WEATHER_APP_URL: string,
        WEATHER_LIVE_APP_URL: string,
        WEATHER_FORECAST_APP_URL: string,
        BATTERY_DASHBOARD_URL: string,
        FLAGSMITH_BASE_URL: string,
        FLAGSMITH_ENVIRONMENT_ID: string,
        AZURE_DEVOPS_TOKEN: string,
        NODE_ENV: string,
        WITH_MOCKS: string,
    },
    argv: string,
};

type FCC<P extends {} = {}> = import("react").FC<import("react").PropsWithChildren<P>>;
