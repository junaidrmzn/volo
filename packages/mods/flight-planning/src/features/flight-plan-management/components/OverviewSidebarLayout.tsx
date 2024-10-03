import { Header, SideMenuLayout, VStack } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../../translations";

type OverviewSidebarLayoutProps = {
    title: string;
    setSelectedId: (id: string | undefined) => void;
};

export const OverviewSidebarLayout: FCC<OverviewSidebarLayoutProps> = (props) => {
    const { children, setSelectedId, title } = props;
    const { t } = useFlightPlanningTranslation();
    return (
        <SideMenuLayout.Menu menuKey="main">
            <VStack align="flex-start" padding="6" height="full">
                <VStack alignItems="flex-center" wordBreak="break-all">
                    <Header>
                        <Header.Title
                            title={title}
                            hasReturnMarker
                            returnMarkerAriaLabel={t("common.back")}
                            onClick={() => setSelectedId(undefined)}
                        />
                    </Header>
                </VStack>
                <VStack alignItems="flex-start" w="full" gap={1} p={{ base: 12, md: 0 }}>
                    {children}
                </VStack>
            </VStack>
        </SideMenuLayout.Menu>
    );
};
