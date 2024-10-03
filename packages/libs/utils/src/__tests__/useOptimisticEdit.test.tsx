import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-hooks";
import { useOptimisticEdit } from "..";

describe("useOptimisticEdit", () => {
    it("calls onError with the correct error object when editResource throws an error", async () => {
        const queryClient = new QueryClient();
        // eslint-disable-next-line destructuring/in-params
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );

        const mockError = { message: "Error message", details: ["Detail 1", "Detail 2"] };
        const editResource = jest.fn().mockRejectedValue(mockError);
        const onError = jest.fn();

        const { result, waitFor } = renderHook(
            () =>
                useOptimisticEdit({
                    queryKey: [],
                    onError,
                    editResource,
                }),
            { wrapper }
        );

        act(() => {
            result.current.optimisticEdit({ data: {} });
        });

        await waitFor(() => expect(onError).toHaveBeenCalledWith(mockError));
    });
});
