import { Flex, SideMenuLayout } from "@volocopter/design-library-react";
import { IdSelectionProvider } from "../../hooks";
import { OverviewLayoutPageContent as Page } from "./OverviewLayoutPageContent";
import { OverviewLayoutSideMenu } from "./OverviewLayoutSideMenu";

const OverviewLayoutTemplate: FCC = (props) => {
    const { children } = props;

    return (
        <Flex height="100%" width="100%">
            <IdSelectionProvider>
                <OverviewLayoutSideMenu>{children}</OverviewLayoutSideMenu>
            </IdSelectionProvider>
        </Flex>
    );
};

export const OverviewLayout = Object.assign(OverviewLayoutTemplate, { Menu: SideMenuLayout.Menu, Page });
