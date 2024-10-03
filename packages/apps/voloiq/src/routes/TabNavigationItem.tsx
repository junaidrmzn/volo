import { Box, BoxProps } from "@volocopter/design-library-react";
import { Action, RequirePermissions, RequirePermissionsProps } from "@voloiq/auth";
import { ConditionalWrapper } from "@voloiq/utils";

export type TabNavigationItemProps = {
    onClick: () => void;
    isActive?: boolean;
    requiresPermissionsFor?: RequirePermissionsProps["resources"];
    label: string;
};

// these props are to work around the fact that changing the font style from light to bold when a tab is active causes the element to be wider
// which in turn causes the other tabs to jump around. Stolen from here: https://css-tricks.com/bold-on-hover-without-the-layout-shift/
const getLayoutShiftWorkaroundProps = (label: string): BoxProps => ({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    _after: {
        content: `"${label}"`,
        height: 0,
        visibility: "hidden",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
        fontWeight: "bold",
    },
});

export const TabNavigationItem = (props: TabNavigationItemProps) => {
    const { onClick, isActive, requiresPermissionsFor, label } = props;
    const actions: Action[] = ["read"];

    return (
        <ConditionalWrapper
            Wrapper={RequirePermissions}
            wrapperProps={{ resources: requiresPermissionsFor!, actions }}
            condition={requiresPermissionsFor !== undefined}
        >
            <Box
                as="button"
                onClick={onClick}
                fontSize="sm"
                lineHeight="double"
                fontWeight={isActive ? "bold" : "light"}
                background={isActive ? "bgNavigationLayer1" : "transparent"}
                p={3}
                borderTopRadius="sm"
                whiteSpace="nowrap"
                aria-selected={isActive}
                {...getLayoutShiftWorkaroundProps(label)}
            >
                {label}
            </Box>
        </ConditionalWrapper>
    );
};
