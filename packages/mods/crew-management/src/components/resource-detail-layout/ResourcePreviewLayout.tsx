import { Header, Spacer, VStack, useColorModeValue } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import React from "react";
import { useIdSelectionContext } from "../../hooks";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export type ResourcePreviewLayoutProps = {
    title: string;
    actionButtons: ReactElement;
};

export const ResourcePreviewLayout: FCC<ResourcePreviewLayoutProps> = (props) => {
    const { title, actionButtons, children } = props;
    const backgroundColor = useColorModeValue("whiteAlpha.600", "gray.700");
    const { t } = useCrewApiTranslation();
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const closeSideMenu = () => {
        setSelectedId(selectedId || "");
    };
    return (
        <VStack align="flex-start" padding="6" backgroundColor={backgroundColor} height="full">
            <VStack alignItems="flex-center" wordBreak="break-all">
                <Header>
                    <Header.Title
                        title={title}
                        hasReturnMarker
                        returnMarkerAriaLabel={t("generic.back button")}
                        onClick={closeSideMenu}
                    />
                </Header>
            </VStack>
            <VStack alignItems="flex-start" w="full" gap={1} p={{ base: 12, md: 0 }}>
                {children}
            </VStack>

            <Spacer />
            <VStack align="flex-start">{actionButtons}</VStack>
        </VStack>
    );
};
