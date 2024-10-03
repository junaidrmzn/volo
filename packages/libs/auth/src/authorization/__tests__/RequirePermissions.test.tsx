import { render, screen } from "@testing-library/react";
import { LocalAuthenticationProvider } from "../../authentication/LocalAuthenticationProvider";
import { RequirePermissions } from "../RequirePermissions";
import type { Action, Group, Resource } from "../authorization";
import { getPermissionsFromGroups } from "../authorization";

type WrapperProps = {
    groups: Group[];
    actions: Action[];
    resources: Resource[];
};

const Wrapper: FCC<WrapperProps> = (props) => {
    const { groups, actions, resources } = props;
    const permissions = getPermissionsFromGroups(groups);

    return (
        <LocalAuthenticationProvider permissions={permissions}>
            <RequirePermissions actions={actions} resources={resources}>
                Authorized
            </RequirePermissions>
        </LocalAuthenticationProvider>
    );
};

test("Renders the children when authorized", () => {
    render(<Wrapper groups={["FlightTestSupervisor"]} actions={["read"]} resources={["Location"]} />);

    expect(screen.getByText("Authorized")).toBeVisible();
});

test("Do not render the children when unauthorized", () => {
    render(<Wrapper groups={["FlightTestSupervisor"]} actions={["create"]} resources={["Location"]} />);

    expect(screen.queryByText("Authorized")).not.toBeInTheDocument();
});
