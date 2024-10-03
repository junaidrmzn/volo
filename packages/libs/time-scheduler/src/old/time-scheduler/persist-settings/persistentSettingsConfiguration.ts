/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

export type WithPersistentSettingsConfiguration = {
    identifier: string;
    persistSettings: true;
};
export const isWithPersistentSettingsConfiguration = (
    configuration: unknown
): configuration is WithPersistentSettingsConfiguration =>
    typeof (configuration as WithPersistentSettingsConfiguration).identifier === "string" &&
    (configuration as WithPersistentSettingsConfiguration).persistSettings === true;

export type WithoutPersistentSettingsConfiguration = {
    identifier?: never;
    persistSettings?: never;
};

export type PersistentSettingsConfiguration =
    | WithPersistentSettingsConfiguration
    | WithoutPersistentSettingsConfiguration;
