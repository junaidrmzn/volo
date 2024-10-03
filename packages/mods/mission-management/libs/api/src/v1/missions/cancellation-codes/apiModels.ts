export type CancellationKey = "CREW" | "WEAT" | "COMM" | "TECH" | "OTHER";

export type CancellationCode = {
    key: CancellationKey;
    description: string;
};
