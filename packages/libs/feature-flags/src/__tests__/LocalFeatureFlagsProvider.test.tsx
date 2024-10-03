import { renderHook } from "@testing-library/react-hooks";
import { MemoryRouter } from "@voloiq/routing";
import { LocalFeatureFlagsProvider } from "../LocalFeatureFlagsProvider";
import { useFeatureFlags } from "../useFeatureFlags";

const wrapper: FCC = (props) => {
    const { children } = props;
    return (
        <MemoryRouter initialEntries={["/"]}>
            <LocalFeatureFlagsProvider>{children}</LocalFeatureFlagsProvider>
        </MemoryRouter>
    );
};

test("LocalFeatureFlagsProvider correctly activates all feature flags by default and exposes it to consumers", () => {
    const { result } = renderHook(() => useFeatureFlags(), {
        wrapper,
    });

    const { isFeatureFlagEnabled } = result.current;

    expect(isFeatureFlagEnabled("logbook")).toEqual(true);
    expect(isFeatureFlagEnabled("any-feature-flag-1234")).toEqual(true);
});

test("LocalFeatureFlagsProvider default feature flags configuration can be overridden", () => {
    const wrapperWithOverrides: FCC = (props) => {
        const { children } = props;
        return (
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "any-feature-flag-1234": { enabled: false },
                }}
            >
                {children}
            </LocalFeatureFlagsProvider>
        );
    };

    const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: wrapperWithOverrides,
    });

    const { isFeatureFlagEnabled } = result.current;

    expect(isFeatureFlagEnabled("logbook")).toEqual(true);
    expect(isFeatureFlagEnabled("any-feature-flag-1234")).toEqual(false);
});
