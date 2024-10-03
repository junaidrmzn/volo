import axios from "axios";

export const fetchOAS = async (module: string, version: string, branchName: string) => {
    const token = process.env.AZURE_DEVOPS_TOKEN;
    if (!token) {
        throw new Error(
            "Could not find the environment variable AZURE_DEVOPS_TOKEN. Make sure it is present in the .env file at the root level of the monorepo."
        );
    }

    const modulePath = `${module}/${module}${version !== "v1" ? `_${version}` : ""}.yaml`;

    try {
        const response = await axios(
            `https://dev.azure.com/volocopter/voloiq/_apis/git/repositories/voloiq-openapi-schemas/items?path=/${modulePath}&versionDescriptor.version=${branchName}&includeContent=true&api-version=6.0`,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`:${token}`).toString("base64")}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error("File could not be fetched.");
        }

        return response.data.content;
    } catch {
        throw new Error(
            `Could not fetch the OpenAPI schema remotely: please make sure your token has code READ access, and that the file ${modulePath} exists in the voloiq-openapi-schemas repository.`
        );
    }
};
