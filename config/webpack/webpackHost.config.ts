import path from "node:path";
import type { Configuration } from "webpack";
import { container } from "webpack";
import merge from "webpack-merge";
import { sharedDependencies } from "./webpack.module.shared";

const { ModuleFederationPlugin } = container;

export type WebpackHostConfigurationOptions = {
    rootPath: string;
    remotes: Record<string, string>;
};
export const webpackHostConfiguration = (options: WebpackHostConfigurationOptions): Configuration => {
    const { rootPath, remotes } = options;
    const outputDirectory = path.resolve(rootPath, "dist");

    return merge({
        output: {
            filename: "[name].[contenthash].js",
            path: outputDirectory,
            publicPath: "/",
            clean: true,
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "shell",
                filename: "remoteEntry.js",
                remotes,
                exposes: {},
                shared: sharedDependencies,
            }),
        ],
    });
};
