import type { Config } from "@jest/types";

export type JestBaseConfigurationProps = {
    name: string;
    babelConfigPath?: string;
};

export const baseConfiguration = (props: JestBaseConfigurationProps): Config.InitialOptions => {
    const { name, babelConfigPath = "./config/babel.config.js" } = props;
    return {
        roots: ["<rootDir>/src"],
        rootDir: "../",
        transform: {
            "\\.[jt]sx?$": ["babel-jest", { configFile: babelConfigPath }],
        },
        collectCoverageFrom: ["**/src/**/*.ts", "**/src/**/*.tsx"],
        testRegex: ["(.*\\.test\\.[jt]sx?)$", "(.*\\.pacttest\\.[jt]sx?)$"],
        moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
        collectCoverage: true,
        coverageReporters: ["lcov", "html", "json"],
        coverageDirectory: "coverage",
        coveragePathIgnorePatterns: ["api"],
        verbose: true,
        name,
        displayName: name,
        globals: {
            BACKEND_BASE_URL: "http://localhost:8080",
            ANALYTICS_APP_URL: "https://logbook-analytics.dev.voloiq.io",
            WEATHER_APP_URL: "https://weather-dash.dev.voloiq.io",
            WEATHER_LIVE_APP_URL: "https://weather-live.dev.voloiq.io",
            WEATHER_FORECAST_APP_URL: "https://weather-forecast.dev.voloiq.io",
            BATTERY_DASHBOARD_URL: "https://voloiq-battery-dashboard.dev.voloiq.io",
            FEEDBACK_URL: "https://jira.volocopter.org/plugins/servlet/desk/portal/8",
        },
    };
};
