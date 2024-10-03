export const packageTypes = ["lib", "app", "mod"] as const;
export type PackageType = typeof packageTypes[number];
