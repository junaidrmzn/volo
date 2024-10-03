import { SideMenuLayout } from "@volocopter/design-library-react";
import { useFilteringPanelContext, useIdSelectionContext } from "../../hooks";
import { useSortingContext } from "../../hooks/sorting";

export const OverviewLayoutSideMenu: FCC = (props) => {
    const { children } = props;
    const { selectedId } = useIdSelectionContext();
    const { isSortingPanelShown } = useSortingContext();
    const { isFilteringPanelShown } = useFilteringPanelContext();

    const isIdSelected = selectedId !== undefined;
    return (
        <SideMenuLayout openMenuKey={isIdSelected || isSortingPanelShown || isFilteringPanelShown ? "main" : undefined}>
            {children}
        </SideMenuLayout>
    );
};
