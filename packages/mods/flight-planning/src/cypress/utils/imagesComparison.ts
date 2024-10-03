import { graphImagesObject, mapImagesObject } from "../images";

function getImageDimensions(base64ImageData: string, imageFormat: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
        const img = new Image();
        img.addEventListener("load", () => {
            resolve({ width: img.width, height: img.height });
        });
        img.src = `data:image/${imageFormat};base64,${base64ImageData}`;
    });
}

function drawResizedImageOnCanvas(
    base64ImageData: string,
    targetWidth: number,
    targetHeight: number,
    imageFormat: string
): Promise<globalThis.ImageData> {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        const img = new Image();
        img.addEventListener("load", () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, targetWidth, targetHeight);
            const resizedImageData = context.getImageData(0, 0, targetWidth, targetHeight);
            resolve(resizedImageData);
        });
        img.src = `data:image/${imageFormat};base64,${base64ImageData}`;
    });
}

const calculateImageDifference = async (
    image1Base64: string,
    image1Width: number,
    image1Height: number,
    image2Base64: string,
    image2Width: number,
    image2Height: number,
    imageFormat: string
): Promise<number> => {
    const width = Math.min(image1Width, image2Width);
    const height = Math.min(image1Height, image2Height);
    const resizedImageData1 = drawResizedImageOnCanvas(image1Base64, width, height, imageFormat);
    const resizedImageData2 = drawResizedImageOnCanvas(image2Base64, width, height, imageFormat);
    const image1 = await resizedImageData1;
    const image2 = await resizedImageData2;
    const imageData1 = image1.data;
    const imageData2 = image2.data;
    const { length } = imageData1;
    let difference = 0;
    for (let index = 0; index < length; index += 4) {
        const currentData1Index = imageData1[index];
        const currentData1IndexPlus1 = imageData1[index + 1];
        const currentData1IndexPlus2 = imageData1[index + 2];
        const currentData2Index = imageData2[index];
        const currentData2IndexPlus1 = imageData2[index + 1];
        const currentData2IndexPlus2 = imageData2[index + 2];

        const diffR = Math.abs((currentData1Index ?? 0) - (currentData2Index ?? 0));
        const diffG = Math.abs((currentData1IndexPlus1 ?? 0) - (currentData2IndexPlus1 ?? 0));
        const diffB = Math.abs((currentData1IndexPlus2 ?? 0) - (currentData2IndexPlus2 ?? 0));
        difference += (diffR + diffG + diffB) / 3;
    }
    const totalPixels = length / 4;
    return difference / (totalPixels * 255);
};

export const validateDataFromImage = async (
    currentImageData: string,
    refrenceImage: string,
    imageType: "graph" | "map",
    imageFormat = "png",
    differenceThreshold: number = 0.1
): Promise<boolean> => {
    if (typeof currentImageData !== "string") return false;
    const refImage =
        imageType === "graph" ? graphImagesObject[refrenceImage] ?? "" : mapImagesObject[refrenceImage] ?? "";
    const refImageDimensions = await getImageDimensions(refImage, imageFormat);
    const refImageWidth = refImageDimensions.width;
    const refImageHeight = refImageDimensions.height;
    const curentImageDimensions = await getImageDimensions(currentImageData, imageFormat);
    const currentImageWidth = curentImageDimensions.width;
    const currentImageHeight = curentImageDimensions.height;
    const differenceCalculationResults = await calculateImageDifference(
        refImage,
        refImageWidth,
        refImageHeight,
        currentImageData,
        currentImageWidth,
        currentImageHeight,
        imageFormat
    );
    if (differenceCalculationResults <= differenceThreshold) return true;
    return false;
};
