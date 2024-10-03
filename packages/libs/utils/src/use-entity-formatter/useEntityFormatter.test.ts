import { renderHook } from "@testing-library/react-hooks";
import { useEntityFormatter } from "./useEntityFormatter";

describe("formatWithParentheses", () => {
    const mainString = "Main String";
    const subString = "Sub String";

    test("it formats strings to a predefined pattern", () => {
        const { result } = renderHook(() => useEntityFormatter());

        expect(result.current.formatWithParentheses(mainString, subString)).toEqual("Main String (Sub String)");
        expect(result.current.formatWithParentheses(mainString)).toEqual("Main String");
        expect(result.current.formatWithParentheses(undefined, subString)).toEqual("Sub String");
        expect(result.current.formatWithParentheses()).toEqual("N/A");
        expect(result.current.formatWithParentheses(undefined, undefined, "n/a")).toEqual("n/a");
    });
});
