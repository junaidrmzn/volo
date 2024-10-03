const getCssStyle = (element: HTMLElement, property: string) => {
    return window.getComputedStyle(element, null).getPropertyValue(property);
};

const getCanvasFont = (element = document.body, fontSize = "14px") => {
    const fontFamily = getCssStyle(element, "font-family") || "Gotham, sans-serif";
    return `${fontSize} ${fontFamily}`;
};

/**
 * Returns the given string width in px based on the document body font family
 *
 * @param string The string
 * @returns The string width
 */
export const getStringWidth = (string: string, fontSize = "14px") => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
        return 0;
    }
    context.font = getCanvasFont(undefined, fontSize);
    const metrics = context.measureText(string);
    return metrics.width;
};

/**
 * Truncates the given string in the middle based on a given maximum width.
 * This function is fast but not accurate (it may be that there is still room for a few characters).
 * The appendedCharacterCount parameter should be passed in order to improve the accuracy to fit as
 * many characters as possible.
 *
 * @param string The string to be truncated
 * @param stringWidth The string width in px
 * @param maxWidth The maximum width of the returned truncated string
 * @param appendedCharacterCount The number of characters to be appended to the computed characters to show
 * @returns The string truncated in the middle
 */
const truncate = (string: string, stringWidth: number, maxWidth: number, appendedCharacterCount = 0) => {
    const separator = "...";
    const separatorLength = separator.length;
    const charsToShow = Math.floor(string.length / (stringWidth / maxWidth)) - separatorLength + appendedCharacterCount;
    const frontChars = Math.floor(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return string.slice(0, Math.max(0, frontChars)) + separator + string.slice(string.length - backChars);
};

/**
 * Truncates the given string in the middle based on a given line length and number of lines
 *
 * @param string The string to be truncated
 * @param lineWidth The line width in px
 * @param lineCount The number of lines
 * @returns The string truncated in the middle
 */
export const truncateString = function (string: string, lineWidth: number, lineCount = 2) {
    const textWidth = getStringWidth(string);
    const maxWidth = lineWidth * lineCount;

    if (textWidth <= lineWidth * lineCount) {
        return string;
    }

    let truncatedString = "";
    let appendedCharacterCount = 0;

    // this loop truncates the given string and tries to fit one more character at each iteration
    // until the max width is reached
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const newTruncatedString = truncate(string, textWidth, maxWidth, appendedCharacterCount);
        const newTruncatedStringWidth = getStringWidth(newTruncatedString);
        if (newTruncatedStringWidth >= maxWidth) {
            break;
        }
        truncatedString = newTruncatedString;
        appendedCharacterCount++;
    }

    return truncatedString;
};

export const joinNullableStrings = (strings: (string | null | undefined)[], separator = " "): string => {
    return strings.filter(Boolean).join(separator);
};
