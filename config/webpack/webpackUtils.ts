import type { Configuration } from "webpack";

const DEVELOPMENT_ENV = "development";
const PRODUCTION_ENV = "production";
const TESTING_ENV = "testing";
const VALID_ENVIRONMENTS = [DEVELOPMENT_ENV, PRODUCTION_ENV, TESTING_ENV] as const;
export type Environment = typeof VALID_ENVIRONMENTS[number];

export const isEnvironment = (environment: string): environment is Environment =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    VALID_ENVIRONMENTS.includes(environment as Environment);
export const getEnvironment = () => {
    const environment = process.env.NODE_ENV;
    if (!environment || !isEnvironment(environment)) {
        throw new Error(`${environment} is not a valid environment`);
    }
    return environment;
};

const ENVIRONMENT = getEnvironment();

export const isProduction = () => ENVIRONMENT === PRODUCTION_ENV;
export const getMode = (): Configuration["mode"] => (ENVIRONMENT === PRODUCTION_ENV ? PRODUCTION_ENV : DEVELOPMENT_ENV);

export const getBackendBaseUrl = () => {
    const backendBaseUrl = process.env.BACKEND_BASE_URL;
    if (isProduction()) {
        return backendBaseUrl ?? "$BACKEND_BASE_URL";
    }
    return "http://localhost:9000";
};

export const getFeedbackUrl = () => {
    const feedbackUrl = process.env.FEEDBACK_URL;
    if (isProduction()) {
        return feedbackUrl ?? "$FEEDBACK_URL";
    }
    return "https://jira.volocopter.org/plugins/servlet/desk/portal/8";
};

export const getDashAppUrl = () => {
    const dashAppUrl = process.env.ANALYTICS_APP_URL;
    if (isProduction()) {
        return dashAppUrl ?? "$ANALYTICS_APP_URL";
    }
    return "https://dash-app.dev.voloiq.io";
};

export const getVolocityDashAppUrl = () => {
    const dashAppUrl = process.env.VOLOCITY_ANALYTICS_APP_URL;
    if (isProduction()) {
        return dashAppUrl ?? "$VOLOCITY_ANALYTICS_APP_URL";
    }
    return "https://volocity-analytics.dev.voloiq.io";
};

export const getWeatherAppUrl = () => {
    const dashAppUrl = process.env.WEATHER_APP_URL;
    if (isProduction()) {
        return dashAppUrl ?? "$WEATHER_APP_URL";
    }
    return "https://weather-dash.dev.voloiq.io";
};

export const getWeatherLiveAppUrl = () => {
    const dashAppUrl = process.env.WEATHER_LIVE_APP_URL;
    if (isProduction()) {
        return dashAppUrl ?? "$WEATHER_LIVE_APP_URL";
    }
    return "https://weather-live.dev.voloiq.io";
};

export const getWeatherForecastAppUrl = () => {
    const dashAppUrl = process.env.WEATHER_FORECAST_APP_URL;
    if (isProduction()) {
        return dashAppUrl ?? "$WEATHER_FORECAST_APP_URL";
    }
    return "https://weather-forecast.dev.voloiq.io";
};

export const getBatteryDashboardUrl = () => {
    const batteryDashboardUrl = process.env.BATTERY_DASHBOARD_URL;
    if (isProduction()) {
        return batteryDashboardUrl ?? "$BATTERY_DASHBOARD_URL";
    }
    return "https://voloiq-battery-dashboard.dev.voloiq.io";
};

export const withMocks = () => {
    const withMocks = process.env.WITH_MOCKS;
    return withMocks?.toLowerCase() === "true";
};
