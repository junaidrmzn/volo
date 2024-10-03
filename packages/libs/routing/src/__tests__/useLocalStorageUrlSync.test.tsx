import { act, renderHook } from "@testing-library/react-hooks";
import type { JSXElementConstructor, ReactElement } from "react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { ParametersCacheProvider } from "../parameters-cache-context";
import { useLocalStorageUrlSync } from "../useLocalStorageUrlSync";

const wrapper: JSXElementConstructor<{ children: ReactElement }> = (props) => {
    const { children } = props;
    return (
        <MemoryRouter>
            <ParametersCacheProvider>{children}</ParametersCacheProvider>
        </MemoryRouter>
    );
};

const wrapperWithParameter: JSXElementConstructor<{ children: ReactElement }> = (props) => {
    const { children } = props;
    return (
        <MemoryRouter initialEntries={["/?test=testString"]}>
            <ParametersCacheProvider> {children} </ParametersCacheProvider>
        </MemoryRouter>
    );
};

const localStorageKey = "testKey";

beforeEach(() => {
    window.localStorage.clear();
});

test("The hook returns an existing parameter", async () => {
    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper: wrapperWithParameter });
    expect(result.current.parameters).toStrictEqual({ test: "testString" });
});

test("The setter can add a parameter to the url, return it again and sync it into the localStorage", async () => {
    window.history.pushState({}, "", "/");
    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper });

    expect(result.current.parameters).toStrictEqual({});

    act(() => result.current.setParameters({ test: "setTest" }));

    expect(result.current.parameters).toStrictEqual({ test: "setTest" });
    expect(window.localStorage.getItem(localStorageKey)).toStrictEqual(JSON.stringify({ test: "setTest" }));
});

test("The hook can add an additional parameter to an already existing one", async () => {
    window.history.pushState({}, "", "/?test=testString");
    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper: wrapperWithParameter });

    expect(result.current.parameters).toStrictEqual({ test: "testString" });

    act(() => {
        result.current.setParameters((previous) => ({ ...previous, test2: "setTest" }));
    });

    expect(result.current.parameters).toStrictEqual({ test: "testString", test2: "setTest" });
});

test("The hook can recover parameter state from the localStorage", async () => {
    window.localStorage.setItem(localStorageKey, JSON.stringify({ test: "testString" }));

    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper });

    expect(result.current.parameters).toStrictEqual({ test: "testString" });
});

test("The hook prioritizes an existing parameter over the localStorage", async () => {
    window.localStorage.setItem(localStorageKey, JSON.stringify({ test: "storageString" }));

    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper: wrapperWithParameter });

    expect(result.current.parameters).toStrictEqual({ test: "testString" });
});

test("The hook can remove existing parameters", async () => {
    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper });

    act(() => {
        result.current.setParameters({ test: "testString" });
    });

    expect(result.current.parameters).toStrictEqual({ test: "testString" });

    act(() => {
        result.current.setParameters({});
    });

    expect(result.current.parameters).toStrictEqual({});
});

test("The hook can remove existing parameters from a list of two parameters", async () => {
    const { result } = renderHook(() => useLocalStorageUrlSync(localStorageKey), { wrapper });

    act(() => {
        result.current.setParameters({ test: "testString" });
    });

    expect(result.current.parameters).toStrictEqual({ test: "testString" });

    act(() => {
        result.current.setParameters((previous) => ({ ...previous, test2: "testString2" }));
    });

    expect(result.current.parameters).toStrictEqual({ test: "testString", test2: "testString2" });

    act(() => {
        result.current.setParameters({ test: "testString" });
    });

    expect(result.current.parameters).toStrictEqual({ test: "testString" });
});

test("User can navigate away from page and filters are still applied when navigating back", async () => {
    const { result, waitFor } = renderHook(
        () => {
            const localStorageUrlSyncResult = useLocalStorageUrlSync(localStorageKey);
            const useSearchParamsResult = useSearchParams();

            return {
                localStorageUrlSyncResult,
                useSearchParamsResult,
            };
        },
        { wrapper }
    );

    act(() => {
        result.current.localStorageUrlSyncResult.setParameters({ test: "testString" });
    });
    await waitFor(() => expect(result.current.useSearchParamsResult[0].get("test")).toEqual("testString"));

    act(() => {
        result.current.useSearchParamsResult[1]({});
    });
    expect(result.current.localStorageUrlSyncResult.parameters).toEqual({ test: "testString" });
});
