import { Box, Center, Header, Spinner, VStack, useColorModeValue } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { match } from "ts-pattern";
import { TechnicalError } from "@voloiq/error-views";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { useResourceMultiPreviewTranslations } from "./translations/useResourceMultiPreviewTranslations";

export type RenderMultiPreviewHandlerProps<Resource> = {
    closeMultiPreview: () => void;
    reloadList: () => void;
    selectedElements: Resource[];
};

export type RenderMultiPreviewHandler<Resource> = (
    props: RenderMultiPreviewHandlerProps<Resource>
) => ReactElement | null;

export type ResourceMultiPreviewProps<Resource> = {
    renderMultiPreview: RenderMultiPreviewHandler<Resource>;
};

export const ResourceMultiPreview = <Resource extends BaseResource>(props: ResourceMultiPreviewProps<Resource>) => {
    const { renderMultiPreview } = props;
    const { t } = useResourceMultiPreviewTranslations();
    const [state, send] = useGlobalState();
    const {
        context: { selectedElements },
        meta: {
            multiPreview: { getMultiPreviewTitle },
        },
        matches,
    } = state;
    const backgroundColor = useColorModeValue("monochrome.200", "monochrome.800");

    return match(state)
        .when(
            () => matches("multiPreview.loading"),
            () => (
                <Center boxSize="full">
                    <Spinner />
                </Center>
            )
        )
        .when(
            () => matches("multiPreview.error"),
            () => <TechnicalError onTryAgainClick={() => send({ type: "RELOAD_MULTI_PREVIEW" })} />
        )
        .otherwise(() => (
            <VStack
                align="stretch"
                paddingX="9"
                paddingY="6"
                spacing="10"
                backgroundColor={backgroundColor}
                height="full"
                data-testid="multi-preview-sidepanel"
            >
                <Header>
                    <Header.Title
                        title={getMultiPreviewTitle()}
                        hasReturnMarker
                        returnMarkerAriaLabel={t("Close side menu")}
                        onClick={() => send({ type: "CLOSE" })}
                    />
                </Header>
                <Box flex={1}>
                    {renderMultiPreview({
                        reloadList: () => send({ type: "RELOAD_LIST" }),
                        closeMultiPreview: () => send({ type: "CLOSE" }),
                        selectedElements,
                    })}
                </Box>
            </VStack>
        ));
};
