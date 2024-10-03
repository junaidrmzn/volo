export const getFileSizeString = (fileSizeInBytes: number) => {
    if (fileSizeInBytes === 0) {
        return "0 B";
    }
    const level = Math.floor(Math.log(fileSizeInBytes) / Math.log(1024));
    return `${(fileSizeInBytes / 1024 ** level).toFixed(2)} ${" KMGTP".charAt(level)}B`;
};
