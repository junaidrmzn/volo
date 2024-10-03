import HtmlPlugin from "html-webpack-plugin";
import path from "node:path";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";
import { DefinePlugin } from "webpack";
import {
    getBackendBaseUrl,
    getBatteryDashboardUrl,
    getDashAppUrl,
    getEnvironment,
    getFeedbackUrl,
    getMode,
    getVolocityDashAppUrl,
    getWeatherAppUrl,
    getWeatherForecastAppUrl,
    getWeatherLiveAppUrl,
    isProduction,
    withMocks,
} from "./webpack.utils";

export type BaseConfigurationOptions = {
    rootPath: string;
    mainEntryPoint?: string;
};
export const baseConfiguration = (options: BaseConfigurationOptions): Configuration => {
    const { rootPath, mainEntryPoint = path.resolve(rootPath, "src/index.tsx") } = options;
    const minimize = isProduction();
    const outputDirectory = path.resolve(rootPath, "dist");
    const babelConfigFile = path.resolve(rootPath, "config", "babel.config.js");

    return {
        mode: getMode(),
        entry: {
            bundle: mainEntryPoint,
        },
        output: {
            filename: "[name].[contenthash].js",
            path: outputDirectory,
            publicPath: "/",
            clean: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            configFile: babelConfigFile,
                            cacheDirectory: true,
                            cacheCompression: false,
                        },
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[name].[contenthash][ext][query]",
                    },
                },
                { test: /\.css$/i, use: ["style-loader", "css-loader"] },
                {
                    test: /\.svg$/i,
                    issuer: /\.(ts|tsx)?$/,
                    use: ["@svgr/webpack"],
                },
            ],
        },
        optimization: {
            moduleIds: "deterministic",

            ...(minimize && {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        parallel: true,
                        terserOptions: {
                            compress: {
                                drop_console: false,
                            },
                        },
                    }),
                ],
            }),
        },
        plugins: [
            new HtmlPlugin({
                template: path.resolve(rootPath, "resources/index.html"),
                favicon: path.resolve(rootPath, "resources/favicon.ico"),
            }),
            new DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(getEnvironment()),
                "process.env.WITH_MOCKS": JSON.stringify(withMocks()),
                BACKEND_BASE_URL: JSON.stringify(getBackendBaseUrl()),
                ANALYTICS_APP_URL: JSON.stringify(getDashAppUrl()),
                VOLOCITY_ANALYTICS_APP_URL: JSON.stringify(getVolocityDashAppUrl()),
                WEATHER_APP_URL: JSON.stringify(getWeatherAppUrl()),
                WEATHER_LIVE_APP_URL: JSON.stringify(getWeatherLiveAppUrl()),
                WEATHER_FORECAST_APP_URL: JSON.stringify(getWeatherForecastAppUrl()),
                BATTERY_DASHBOARD_URL: JSON.stringify(getBatteryDashboardUrl()),
                FEEDBACK_URL: JSON.stringify(getFeedbackUrl()),
            }),
        ],
    };
};
