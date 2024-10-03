export const anyFileUrl = (fileName: string) => ({
    url: `https://my-testing-storage.blob.core.windows.net/uploads/${fileName}?se=2020-11-06T16:34:41.000Z&sp=w&sv=2022-11-02&sr=b&rscd=attachment%3B%20filename=${fileName}&sig=iLDKSWaGnIvuezbslrBcWqvSmuImYXKOB%2BwjKX4zEcs%3D`,
    expiry: "2020-11-06T16:34:41.000Z",
});
