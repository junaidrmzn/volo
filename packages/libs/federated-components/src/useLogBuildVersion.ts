/* eslint-disable no-console */
import { useEffect } from "react";

type VersionData = {
    commitId: string;
    branch: string;
    buildId: string;
    date: string;
};

const isVersionData = (json: unknown): json is VersionData => {
    if (!json || typeof json !== "object") return false;

    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { commitId, branch, buildId, date } = json as VersionData;
    return (
        typeof commitId === "string" &&
        typeof branch === "string" &&
        typeof buildId === "string" &&
        typeof date === "string"
    );
};
type UseLogBuildVersionOptions = {
    module: string;
};
export const useLogBuildVersion = (options: UseLogBuildVersionOptions) => {
    const { module } = options;

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/microFrontends/${module}/version.json`);
                if (!response.ok) throw new Error(`Failed to fetch version.json: ${response.statusText}`);

                const json = await response.json();
                if (isVersionData(json)) {
                    console.log({ module, ...json });
                } else {
                    throw new Error("Invalid version data format");
                }
            } catch (error) {
                console.error("Error fetching version data:", error);
            }
        })();
    }, [module]);
};
