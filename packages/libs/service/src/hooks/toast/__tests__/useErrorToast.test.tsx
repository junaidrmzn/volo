// eslint-disable-next-line no-restricted-imports
import { fireEvent, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { I18nProvider } from "@voloiq/i18n";
import { useErrorToast } from "../useErrorToast";

describe("useErrorToast", () => {
    it("should call navigator.clipboard.writeText when action button is clicked", () => {
        const { result } = renderHook(() => useErrorToast(), {
            wrapper: I18nProvider,
        });

        const title = "Test Error";
        const description = "This is a test error";

        result.current.displayErrorToast(title, description);

        const mockWriteText = jest.fn();
        Object.assign(navigator, {
            clipboard: {
                writeText: mockWriteText,
            },
        });

        const copyButton = screen.getByLabelText("Copy error message");
        fireEvent.click(copyButton);

        expect(mockWriteText).toHaveBeenCalledWith(`${title}\n${description}`);
    });
});
