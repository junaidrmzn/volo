import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { LocalAuthenticationProvider } from "../../authentication/LocalAuthenticationProvider";
import { getPermissionsFromGroups } from "../authorization";
import { useIsAuthorizedTo } from "../useIsAuthorizedTo";

const flightTestSupervisorWrapper: FCC = (props) => {
    const { children } = props;
    const permissions = getPermissionsFromGroups(["FlightTestSupervisor"]);

    return <LocalAuthenticationProvider permissions={permissions}>{children}</LocalAuthenticationProvider>;
};

const adminWrapper: FCC = (props) => {
    const { children } = props;
    const permissions = getPermissionsFromGroups(["Admin"]);

    return <LocalAuthenticationProvider permissions={permissions}>{children}</LocalAuthenticationProvider>;
};

describe("Admin group", () => {
    const testCases: Parameters<typeof useIsAuthorizedTo>[] = [
        [["read"], ["Log"]],
        [["create"], ["Log"]],
        [["update"], ["Log"]],
        [["delete"], ["Log"]],
        [["read", "create", "update", "delete"], ["Log"]],
        [["read"], ["Log", "Location", "CrewMember", "SoftwareConfiguration"]],
        [
            ["read", "create", "update", "delete"],
            ["Log", "Location", "CrewMember", "SoftwareConfiguration"],
        ],
    ];

    for (const [actions, resources] of testCases) {
        test(`has ${actions} permissions on resources ${resources}`, () => {
            const { result } = renderHook(() => useIsAuthorizedTo(actions, resources), {
                wrapper: adminWrapper,
            });

            expect(result.current).toBe(true);

            cleanup();
        });
    }
});

describe("FlightTestSupervisor", () => {
    const testCases: [...Parameters<typeof useIsAuthorizedTo>, boolean][] = [
        [["create"], ["Log"], true],
        [["read"], ["Log"], true],
        [["update"], ["Log"], true],
        [["delete"], ["Log"], true],
        [["create", "read"], ["Log"], true],
        [["create", "read", "update"], ["Log"], true],
        [["create", "read", "update", "delete"], ["Log"], true],
        [["read"], ["Location"], true],
        [["create"], ["Location"], false],
        [["update"], ["Location"], false],
        [["delete"], ["Location"], false],
        [["create", "read"], ["Location"], false],
        [["create", "read", "update"], ["Location"], false],
        [["create", "read", "update", "delete"], ["Location"], false],
    ];

    for (const [actions, resources, shouldHavePermission] of testCases) {
        test(
            shouldHavePermission
                ? `has ${actions} permissions on resources ${resources}`
                : `doesn't have ${actions} permissions on resources ${resources}`,
            () => {
                const { result } = renderHook(() => useIsAuthorizedTo(actions, resources), {
                    wrapper: flightTestSupervisorWrapper,
                });

                expect(result.current).toBe(shouldHavePermission);

                cleanup();
            }
        );
    }
});
