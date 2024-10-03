import { SideMenuLayout } from "@volocopter/design-library-react";
import { useIdSelectionContext } from "../../hooks";

export const OverviewLayoutSideMenu: FCC = (props) => {
    const { children } = props;
    const { selectedId } = useIdSelectionContext();

    const isIdSelected = selectedId !== undefined;
    return <SideMenuLayout openMenuKey={isIdSelected ? "main" : undefined}>{children}</SideMenuLayout>;
};
