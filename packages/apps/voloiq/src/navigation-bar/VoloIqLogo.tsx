import { VoloIqLogo as DesignLibraryVoloIqLogo, NavigationBarLogo } from "@volocopter/design-library-react";
import { Link } from "@voloiq/routing";

export const VoloIqLogo = () => (
    <NavigationBarLogo>
        {(expansionState) => (
            <Link to="/">
                <DesignLibraryVoloIqLogo expansionState={expansionState} />
            </Link>
        )}
    </NavigationBarLogo>
);
