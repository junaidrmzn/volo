import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { FeatureFlagsProvider } from "../FeatureFlagsProvider";
import { useFeatureFlags } from "../useFeatureFlags";
import { anyFeature, anyFeatureFlagObject } from "./mocks/anyFeatureFlagObject";
import type { FeatureFlagObject } from "./mocks/types";

const makeGetIdentitiesFeatureFlagsHandler = (featureFlagResponse: FeatureFlagObject[]) =>
    rest.get("http://voloiq.io/api/v1/identities", (_request, response, context) =>
        response(context.status(200), context.json({ flags: featureFlagResponse, traits: [] }))
    );

const { listen, close, use, resetHandlers } = setupServer();

beforeAll(() => listen());

beforeEach(() => resetHandlers());

afterAll(() => close());

const wrapper: FCC = (props) => {
    const { children } = props;
    return (
        <LocalAuthenticationProvider>
            <FeatureFlagsProvider baseUrl="http://voloiq.io" environmentId="prod">
                {children}
            </FeatureFlagsProvider>
        </LocalAuthenticationProvider>
    );
};

test("FeatureFlagsProvider correctly fetches the feature flags configuration and exposes it to consumers", async () => {
    const featureFlags = [
        anyFeatureFlagObject({
            feature: anyFeature({
                name: "logbook",
            }),
            enabled: true,
        }),
        anyFeatureFlagObject({
            feature: anyFeature({
                name: "vte-123",
            }),
            enabled: false,
        }),
    ];

    use(makeGetIdentitiesFeatureFlagsHandler(featureFlags));

    const { result, waitFor } = renderHook(() => useFeatureFlags(), {
        wrapper,
    });

    await waitFor(() => {
        expect(result.current).not.toBeUndefined();
    });

    const { isFeatureFlagEnabled } = result.current;

    expect(isFeatureFlagEnabled("logbook")).toEqual(true);
    expect(isFeatureFlagEnabled("vte-123")).toEqual(false);
});

test("Missing feature flags have a default false value", async () => {
    use(makeGetIdentitiesFeatureFlagsHandler([]));

    const { result, waitFor } = renderHook(() => useFeatureFlags(), {
        wrapper,
    });

    await waitFor(() => {
        expect(result.current).not.toBeUndefined();
    });

    const { isFeatureFlagEnabled } = result.current;

    expect(isFeatureFlagEnabled("missingFeatureFlag")).toEqual(false);
    expect(isFeatureFlagEnabled("vte-123")).toEqual(false);
});
