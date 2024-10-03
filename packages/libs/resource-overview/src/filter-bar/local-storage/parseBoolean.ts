import { match } from "ts-pattern";

export const parseBoolean = (value?: string) =>
    match(value)
        .with("true", () => true)
        .with("false", () => false)
        .otherwise(() => undefined);
