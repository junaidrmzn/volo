import { match } from "ts-pattern";

export const timeUnits = ["minutes", "quarterHours", "hours", "days", "months"] as const;
export type TimeUnit = typeof timeUnits[number];

export const getSmallerTimeUnit = (timeUnit: TimeUnit): TimeUnit =>
    match(timeUnit)
        .with("minutes", () => "minutes" as const)
        .with("quarterHours", () => "minutes" as const)
        .with("hours", () => "quarterHours" as const)
        .with("days", () => "hours" as const)
        .with("months", () => "days" as const)
        .exhaustive();

export const getLargerTimeUnit = (timeUnit: TimeUnit): TimeUnit =>
    match(timeUnit)
        .with("minutes", () => "quarterHours" as const)
        .with("quarterHours", () => "hours" as const)
        .with("hours", () => "days" as const)
        .with("days", () => "months" as const)
        .with("months", () => "months" as const)
        .exhaustive();
