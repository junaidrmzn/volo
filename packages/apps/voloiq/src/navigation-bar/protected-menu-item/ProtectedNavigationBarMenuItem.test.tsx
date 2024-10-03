import { Icon, NavigationBar, NavigationBarMenu } from "@volocopter/design-library-react";
import { render, screen } from "@voloiq/testing";
import { ProtectedNavigationBarMenuItem } from "./ProtectedNavigationBarMenuItem";

test("User will not see a menu item without entries", () => {
    render(
        <NavigationBar>
            <NavigationBarMenu>
                <ProtectedNavigationBarMenuItem icon={<Icon icon="aircraft" />} label="Aircraft">
                    {() => null}
                </ProtectedNavigationBarMenuItem>
            </NavigationBarMenu>
        </NavigationBar>
    );

    expect(screen.queryByRole("button", { name: "Aircraft" })).not.toBeInTheDocument();
});
