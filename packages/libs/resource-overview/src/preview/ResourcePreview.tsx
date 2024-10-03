import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Header,
    Spinner,
    VStack,
    useColorModeValue,
} from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { TechnicalError } from "@voloiq/error-views";
import { DeleteButton } from "../delete/DeleteResourceButton";
import { EditButton } from "../edit/EditButton";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { DetailsButton } from "./ResourceDetailsButton";
import { useResourcePreviewTranslations } from "./translations/useResourcePreviewTranslations";

export type ResourcePreviewOptions = {
    reloadList: () => void;
    reloadPreview: () => void;
    closePreview: () => void;
};

export type ResourcePreviewProps<Resource> = {
    renderPreview: (resource: Resource, options: ResourcePreviewOptions) => ReactNode;
    renderActionButtons?: (resource: Resource, options: ResourcePreviewOptions) => ReactNode;
};

export const ResourcePreview = <Resource extends BaseResource>(props: ResourcePreviewProps<Resource>) => {
    const { renderPreview, renderActionButtons } = props;
    const { t } = useResourcePreviewTranslations();
    const [state, send] = useGlobalState();
    const {
        context: { selectedResource, selectedResourceId },
        meta: {
            preview: {
                getPreviewTitle,
                checkIfResourceIsEditable = () => ({ isResourceEditable: true }),
                checkIfResourceIsDeletable = () => ({ isResourceDeletable: true }),
            },
        },
        matches,
    } = state;
    const backgroundColor = useColorModeValue("monochrome.100", "monochrome.800");

    return match(state)
        .when(
            () => matches("preview.loading"),
            () => (
                <Center boxSize="full">
                    <Spinner />
                </Center>
            )
        )
        .when(
            () => matches("preview.error"),
            () => <TechnicalError onTryAgainClick={() => send({ type: "RELOAD_PREVIEW", selectedResourceId })} />
        )
        .otherwise(() => {
            const { isResourceDeletable, notDeletableReason } = checkIfResourceIsDeletable(selectedResource);
            const { isResourceEditable, notEditableReason } = checkIfResourceIsEditable(selectedResource);

            return (
                <VStack
                    align="stretch"
                    paddingX="9"
                    paddingY="6"
                    spacing="10"
                    backgroundColor={backgroundColor}
                    height="full"
                    data-testid="preview-sidepanel"
                    overflowY="auto"
                >
                    <Header>
                        <Header.Title
                            title={getPreviewTitle(selectedResource)}
                            hasReturnMarker
                            returnMarkerAriaLabel={t("Close preview")}
                            onClick={() => send("UNSELECT")}
                        />
                    </Header>
                    <Box flex={1}>
                        {renderPreview(selectedResource, {
                            reloadList: () => send({ type: "RELOAD_LIST" }),
                            reloadPreview: () => send({ type: "RELOAD_PREVIEW", selectedResourceId }),
                            closePreview: () => send([{ type: "CLOSE_PREVIEW" }, { type: "UNSELECT" }]),
                        })}
                    </Box>
                    <VStack spacing={4}>
                        <Box>
                            {state.can("EDIT") && !isResourceEditable && (
                                <Alert status="info">
                                    <AlertIcon />
                                    {notEditableReason}
                                </Alert>
                            )}
                            {state.can("DELETE") && !isResourceDeletable && (
                                <Alert status="info">
                                    <AlertIcon />
                                    {notDeletableReason}
                                </Alert>
                            )}
                        </Box>
                        <VStack spacing={2} alignItems="flex-start" w="full">
                            {!!renderActionButtons &&
                                renderActionButtons(selectedResource, {
                                    reloadList: () => send({ type: "RELOAD_LIST" }),
                                    reloadPreview: () => send({ type: "RELOAD_PREVIEW", selectedResourceId }),
                                    closePreview: () => send([{ type: "CLOSE_PREVIEW" }, { type: "UNSELECT" }]),
                                })}
                            {state.can("DETAILS") && <DetailsButton variant="ghost" />}
                            {state.can("EDIT") && isResourceEditable && <EditButton />}
                            {state.can("DELETE") && isResourceDeletable && <DeleteButton />}
                        </VStack>
                    </VStack>
                </VStack>
            );
        });
};
