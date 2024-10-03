import { renderHook } from "@testing-library/react-hooks";
import { useServiceState } from "./useServiceState";

test("Returns idle state if no request has been made", () => {
    const { result } = renderHook(() => useServiceState({ loading: false, error: null }));
    expect(result.current).toBe("idle");
});

test("Returns error state if error is defined", () => {
    const { result } = renderHook(() =>
        useServiceState({
            loading: false,
            error: {
                name: "Error",
                isAxiosError: true,
                config: {},
                message: "You screwed up!",
                toJSON: () => ({}),
            },
        })
    );
    expect(result.current).toBe("error");
});

test("Returns pending state if service is loading", () => {
    const { result } = renderHook(() => useServiceState({ loading: true, error: null }));
    expect(result.current).toBe("pending");
});

test("Returns success state if service was loading previously", () => {
    const { result, rerender } = renderHook((props) => useServiceState(props), {
        initialProps: { loading: true, error: null },
    });
    rerender({ loading: false, error: null });
    expect(result.current).toBe("success");
});

test("Returns success after multiple rerenders without loading", () => {
    const { result, rerender } = renderHook((props) => useServiceState(props), {
        initialProps: { loading: true, error: null },
    });
    rerender({ loading: false, error: null });
    rerender({ loading: false, error: null });
    rerender({ loading: false, error: null });
    expect(result.current).toBe("success");
});

test("Returns pending after a second request", () => {
    const { result, rerender } = renderHook((props) => useServiceState(props), {
        initialProps: { loading: true, error: null },
    });
    rerender({ loading: false, error: null });
    expect(result.current).toBe("success");

    rerender({ loading: true, error: null });
    expect(result.current).toBe("pending");
});
