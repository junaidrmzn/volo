/* eslint no-underscore-dangle: 0 */

export const findCanvas = (element: JQuery<HTMLElement>): HTMLCanvasElement | null => {
    const canvas = element.get(0).querySelector("canvas");
    if (canvas) {
        return canvas;
    }
    const children = element.children();
    for (const child of children) {
        const currentChild = child;
        const canvasInChildren = findCanvas($(currentChild));
        if (canvasInChildren) {
            return canvasInChildren;
        }
    }
    return null;
};

export const verticalProfile = {
    verticalProfile: () => cy.findByTestId("vertical-profile"),

    getVerticalGraphImageData: (): Promise<string> => {
        return new Promise((resolve) => {
            verticalProfile.verticalProfile().then(($verticalGraphElement) => {
                const canvas = findCanvas($verticalGraphElement);
                if (canvas) {
                    const dataUrl = canvas.toDataURL();
                    const base64Header = "data:image/png;base64,";
                    if (dataUrl.includes(base64Header)) {
                        const cleanBase64Data = dataUrl.replace(base64Header, "");
                        resolve(cleanBase64Data);
                    } else {
                        resolve(dataUrl);
                    }
                }
            });
        });
    },
};
