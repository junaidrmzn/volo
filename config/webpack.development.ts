import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "node:path";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { getLocalBackendProxyConfiguration } from "./local-backend.config";
import { baseConfiguration as getBaseConfiguration } from "./webpack.base";
import { DEV_SERVER_PORT, withMocks } from "./webpack.utils";

export type DevelopmentConfigurationOptions = {
    rootPath: string;
    baseConfiguration?: Configuration;
};
export const developmentConfiguration = (options: DevelopmentConfigurationOptions): Configuration => {
    const { rootPath, baseConfiguration } = options;

    return merge(
        { ...(baseConfiguration ?? getBaseConfiguration({ rootPath })) },
        {
            devtool: "source-map",
            devServer: {
                compress: true,
                port: DEV_SERVER_PORT,
                hot: true,
                static: [
                    { directory: path.resolve(rootPath, "dist") },
                    ...(withMocks() ? [{ directory: path.resolve(rootPath, "../../../scripts/msw") }] : []),
                ],
                historyApiFallback: true,
                proxy: withMocks() ? undefined : getLocalBackendProxyConfiguration(),
            },
            plugins: [new ReactRefreshPlugin()],
        }
    );
};
