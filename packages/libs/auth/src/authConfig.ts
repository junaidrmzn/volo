import log from "loglevel";
import { useMemo } from "react";
import type { InferType } from "yup";
import { ValidationError } from "yup";
import { authSchema } from "./authSchema";
import type { Group } from "./authorization/authorization";
import { isGroup } from "./authorization/authorization";

export type Config = InferType<typeof authSchema>;

const isValidConfig = (config: unknown): config is Config => {
    try {
        authSchema.validateSync(config);
        return true;
    } catch (error) {
        if (error instanceof ValidationError) {
            log.error(error.errors.join(", "));
        }
    }
    return false;
};

export const parseAuthConfiguration = (config: string) => {
    const parsedConfig = JSON.parse(config);

    if (!isValidConfig(parsedConfig)) {
        throw new Error(`The auth configuration didn't match the schema`);
    }

    parsedConfig.authorization.mapping
        .filter((mapping) => !isGroup(mapping.targetGroupName))
        .map((mapping) =>
            log.warn(
                `The following target group name is not defined in the authorization.ts file and will be ignored: ${mapping.targetGroupName}`
            )
        );

    return parsedConfig;
};

export const useParsedAuthConfiguration = (authConfiguration: string) => {
    const config = useMemo(() => parseAuthConfiguration(authConfiguration), [authConfiguration]);
    return config;
};

export const getMappedGroupsFromConfig = (providerIds: string[], config: Config): Group[] => {
    const groups: Group[] = [];

    for (const providerId of providerIds) {
        const matchingMapping = config.authorization.mapping.find((mapping) => mapping.sourceId === providerId);
        if (matchingMapping) {
            const { targetGroupName } = matchingMapping;
            const targetGroupNameIsValidGroup = isGroup(targetGroupName);
            if (targetGroupNameIsValidGroup) {
                groups.push(targetGroupName);
            }
        }
    }

    return groups;
};
