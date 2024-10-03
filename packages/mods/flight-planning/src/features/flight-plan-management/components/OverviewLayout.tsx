import { Flex, SideMenuLayout } from "@volocopter/design-library-react";
import { OverviewContentLayout } from "./OverviewContentLayout";
import { OverviewSidebarLayout } from "./OverviewSidebarLayout";

export type OverviewLayoutProps = {
    isOpen: boolean;
};

const OverviewLayoutTemplate: FCC<OverviewLayoutProps> = (props) => {
    const { children, isOpen } = props;
    return (
        <Flex height="100%" width="100%">
            <SideMenuLayout openMenuKey={isOpen ? "main" : undefined}>{children}</SideMenuLayout>
        </Flex>
    );
};

export const OverviewLayout = Object.assign(OverviewLayoutTemplate, {
    Menu: OverviewSidebarLayout,
    Page: OverviewContentLayout,
});
