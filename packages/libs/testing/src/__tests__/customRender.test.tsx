import { screen } from "@testing-library/react";
import type { Action, Resource } from "@voloiq/auth";
import { RequirePermissions } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { customRender } from "../customRender";

type CanOnlyBeSeenWithProps =
    | {
          actions: Action[];
          resources: Resource[];
          featureFlag?: undefined;
      }
    | {
          actions?: undefined;
          resources?: undefined;
          featureFlag: string;
      };

const CanOnlyBeSeenWith: FCC<CanOnlyBeSeenWithProps> = (props) => {
    const { actions, resources, featureFlag } = props;
    const { isFeatureFlagEnabled } = useFeatureFlags();

    if (actions && resources) {
        return (
            <RequirePermissions actions={actions} resources={resources}>
                Authorized
            </RequirePermissions>
        );
    }

    if (!featureFlag) {
        return null;
    }

    return isFeatureFlagEnabled(featureFlag) ? <>Authorized</> : null;
};

test("customRender has all feature flags enabled by default", () => {
    customRender(<CanOnlyBeSeenWith featureFlag="logbook" />);

    expect(screen.getByText("Authorized")).toBeVisible();
});

test("customRender feature flags can be overridden", () => {
    customRender(<CanOnlyBeSeenWith featureFlag="logbook" />, {
        logbook: {
            enabled: false,
            value: null,
        },
    });

    expect(screen.queryByText("Authorized")).not.toBeInTheDocument();
});

test("customRender has all permissions by default", () => {
    customRender(<CanOnlyBeSeenWith actions={["create", "read", "update", "delete"]} resources={["Log"]} />);

    expect(screen.getByText("Authorized")).toBeVisible();
});

test("customRender permissions can be overridden", () => {
    customRender(<CanOnlyBeSeenWith actions={["create"]} resources={["Log"]} />, undefined, ["Log.read"]);

    expect(screen.queryByText("Authorized")).not.toBeInTheDocument();

    customRender(<CanOnlyBeSeenWith actions={["read"]} resources={["Log"]} />, undefined, ["Log.read"]);

    expect(screen.getByText("Authorized")).toBeVisible();
});
