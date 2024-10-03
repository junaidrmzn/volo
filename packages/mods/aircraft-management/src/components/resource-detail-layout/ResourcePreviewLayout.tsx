import { Header, Spacer, VStack, useColorModeValue } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { useIdSelectionContext } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type ResourcePreviewLayoutProps = {
    title: string;
    actionButtons: ReactElement;
};

export const ResourcePreviewLayout: FCC<ResourcePreviewLayoutProps> = (props) => {
    const { title, actionButtons, children } = props;
    const backgroundColor = useColorModeValue("monochrome.100", "gray.700");
    const { t } = useResourcesTranslation();
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const closeSideMenu = () => {
        setSelectedId(selectedId || "");
    };
    return (
        <VStack align="flex-start" padding="6" backgroundColor={backgroundColor} height="full">
            <Header>
                <Header.Title
                    title={title}
                    hasReturnMarker
                    returnMarkerAriaLabel={t("generic.back button")}
                    onClick={closeSideMenu}
                />
            </Header>
            <VStack alignItems="flex-start" w="full" gap={1} p={{ base: 12, md: 0 }}>
                {children}
            </VStack>

            <Spacer />
            <VStack align="flex-start">{actionButtons}</VStack>
        </VStack>
    );
};
