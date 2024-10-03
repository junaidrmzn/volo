import StatoscopePlugin from "@statoscope/webpack-plugin";
import { existsSync as exists, mkdirSync as mkdir } from "node:fs";
import path from "node:path";
import type { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";
import type { BaseConfigurationOptions } from "./webpack.base";
import { baseConfiguration as getBaseConfiguration } from "./webpack.base";

export type ProductionConfigurationOptions = {
    packageName: string;
    baseConfiguration?: Configuration;
} & Pick<BaseConfigurationOptions, "mainEntryPoint" | "rootPath">;
export const productionConfiguration = (options: ProductionConfigurationOptions): Configuration => {
    const { rootPath, packageName, baseConfiguration, mainEntryPoint } = options;
    const buildStatisticsPath = path.resolve(rootPath, "build-statistics");

    if (!exists(buildStatisticsPath)) {
        mkdir(buildStatisticsPath);
    }
    return merge(
        { ...(baseConfiguration ?? getBaseConfiguration({ rootPath, mainEntryPoint })) },
        {
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode: "static",
                    generateStatsFile: true,
                    openAnalyzer: false,
                    logLevel: "error",
                    reportFilename: `${buildStatisticsPath}/report.html`,
                    statsFilename: `${buildStatisticsPath}/stats.html`,
                }),
                new StatoscopePlugin({
                    saveTo: `${buildStatisticsPath}/report-[name]-[hash].html`,
                    saveStatsTo: `${buildStatisticsPath}/stats-[name]-[hash].html`,
                    watchMode: false,
                    name: packageName,
                    open: false,
                }),
            ],
        }
    );
};
