import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { RequirePermissionsProps } from "@voloiq/auth";
import { useLocation, useNavigate } from "@voloiq/routing";
import { TabNavigationItem } from "./TabNavigationItem";
import { ScrollableContainer } from "./scrollable-container/ScrollableContainer";
import { useOverflowDirections } from "./scrollable-container/useOverflowDirections";

export type TabNavigationProps = {
    children: ReactNode;
    tabs: {
        path: string;
        label: string;
        requiresPermissionsFor?: RequirePermissionsProps["resources"];
    }[];
    label: string;
};

export const TabNavigation = (props: TabNavigationProps) => {
    const { children, tabs, label } = props;

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { overflowDirections, ref } = useOverflowDirections();

    return (
        <VStack alignItems="stretch" spacing={0} p={6} pt={10}>
            <HStack spacing={0}>
                <Text
                    fontSize="lg"
                    fontWeight="light"
                    lineHeight={6}
                    p={3}
                    whiteSpace="nowrap"
                    mr={overflowDirections === "NONE" ? 12 : 3}
                >
                    {label}
                </Text>
                <ScrollableContainer overflowDirections={overflowDirections} scrollContainerRef={ref}>
                    {tabs.map((tab) => (
                        <TabNavigationItem
                            key={tab.label}
                            onClick={() => {
                                navigate(tab.path);
                            }}
                            isActive={new RegExp(`${tab.path}(/|$)`).test(pathname)}
                            requiresPermissionsFor={tab.requiresPermissionsFor}
                            label={tab.label}
                        />
                    ))}
                </ScrollableContainer>
            </HStack>
            <Box background="bgNavigationLayer1" p={6} borderRadius="sm">
                {children}
            </Box>
        </VStack>
    );
};
