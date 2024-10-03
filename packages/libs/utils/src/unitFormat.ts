/**
 * Formats the given bytes count in a human readable string
 *
 * @param bytes The bytes count
 * @returns {string} The byte count in a human readable string
 */
export const formatBytes = (bytes: number) => {
    if (bytes === 0) {
        return "0 B";
    }
    const level = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** level).toFixed(2)} ${" KMGTP".charAt(level)}B`;
};
