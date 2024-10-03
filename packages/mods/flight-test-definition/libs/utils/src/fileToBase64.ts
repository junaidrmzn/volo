export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const { result } = reader;
            if (result) {
                resolve(String(result));
            } else {
                reject();
            }
        });

        reader.addEventListener("error", (error) => {
            reject(error);
        });
        reader.readAsDataURL(file);
    });
};
