import { Box, Tab, TabList, Tabs } from "@volocopter/design-library-react";
import { SynchronizedScrollProvider, useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";
import { Link } from "@voloiq/routing";
import { useAnchorNavBarTranslation } from "./translations/useAnchorNavBarTranslation";
import { useActiveTab } from "./useAnchorNavBar";
import type { AnchorNavBarTab } from "./useAnchorNavBar";

export type AnchorNavBarProps = {
    tabs: AnchorNavBarTab[];
};

export const AnchorNavBarWithoutScrollProvider = (props: AnchorNavBarProps) => {
    const { tabs } = props;
    const { t } = useAnchorNavBarTranslation();
    const { onScroll, ref } = useSynchronizedScrollElement();

    const { activeTabIndex, handleTabChange } = useActiveTab(tabs);

    return (
        <Box
            w="full"
            backgroundColor="bgNavigationLayer2"
            position="sticky"
            top={0}
            zIndex={1}
            p={0}
            overflowX="scroll"
            onScroll={onScroll}
            ref={ref}
        >
            <Box maxW="50vw">
                <Tabs index={activeTabIndex}>
                    <TabList aria-label={t("Navigation Bar")}>
                        {tabs.map((tab) => (
                            <Link key={tab.linkId} to={`#${tab.linkId}`} onClick={() => handleTabChange(tab.linkId)}>
                                <Tab>{tab.label}</Tab>
                            </Link>
                        ))}
                    </TabList>
                </Tabs>
            </Box>
        </Box>
    );
};

export const AnchorNavBar = (props: AnchorNavBarProps) => (
    <SynchronizedScrollProvider>
        <AnchorNavBarWithoutScrollProvider {...props} />
    </SynchronizedScrollProvider>
);
