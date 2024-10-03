import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@volocopter/design-library-react";
import { OpenNotificationList } from "./OpenNotificationList";
import { ResolvedNotificationList } from "./ResolvedNotificationList";
import { useNotificationPopoverTranslation } from "./translations/useNotificationPopoverTranslation";

export const NotificationPopover = () => {
    const { t } = useNotificationPopoverTranslation();
    return (
        <Box padding={2} width="full">
            <Tabs size="sm">
                <TabList>
                    <Tab mt={0} mb={2}>
                        <Text fontSize="xs" fontWeight="semibold">
                            {t("open")}
                        </Text>
                    </Tab>
                    <Tab mt={0} mb={2}>
                        <Text fontSize="xs" fontWeight="semibold">
                            {t("resolved")}
                        </Text>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel padding={0}>
                        <OpenNotificationList />
                    </TabPanel>

                    <TabPanel padding={0}>
                        <ResolvedNotificationList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
