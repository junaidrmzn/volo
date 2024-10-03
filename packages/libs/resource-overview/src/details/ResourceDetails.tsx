import { Box, Center, Header, HeaderLayout, Spinner, VStack } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { EditButton } from "../edit/EditButton";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { useResourceDetailsTranslations } from "./translations/useResourceDetailsTranslations";

export type ResourceDetailsOptions = {
    reloadDetails: () => void;
};

export type ResourceDetailsProps<Resource extends BaseResource> = {
    renderDetails: (resource: Resource, options: ResourceDetailsOptions) => ReactNode;
};
export const ResourceDetails = <Resource extends BaseResource>(props: ResourceDetailsProps<Resource>) => {
    const { renderDetails } = props;
    const { t } = useResourceDetailsTranslations();

    const [state, send] = useGlobalState();

    const {
        meta: {
            list: { getListTitle },
            details: { getDetailsTitle, checkIfResourceIsEditable = () => ({ isResourceEditable: false }) },
        },
        context: { selectedResource, selectedResourceId },
    } = state;
    const { isResourceEditable } = checkIfResourceIsEditable(selectedResource);
    return (
        <Box position="relative" boxSize="full">
            {state.matches({ details: "loading" }) && (
                <Center boxSize="full" position="absolute">
                    <Spinner />
                </Center>
            )}
            <HeaderLayout variant="secondary">
                <HeaderLayout.Header>
                    <Header.Title
                        parentTitle={getListTitle()}
                        title={state.matches({ details: "loaded" }) && getDetailsTitle(selectedResource)}
                        hasReturnMarker
                        returnMarkerAriaLabel={t("Return to list")}
                        isLoading={state.matches({ details: "loading" })}
                        onClick={() => send("CLOSE")}
                    />
                    <Header.Controls>
                        {state.can("EDIT") && isResourceEditable && <EditButton variant="primary" />}
                    </Header.Controls>
                </HeaderLayout.Header>
                <HeaderLayout.Content>
                    <VStack alignItems="flex-start" w="full" gap={1} p={0} overflow="auto">
                        {state.matches({ details: "loaded" }) && (
                            <Box boxSize="full">
                                {renderDetails(selectedResource, {
                                    reloadDetails: () => send({ type: "RELOAD_DETAILS", selectedResourceId }),
                                })}
                            </Box>
                        )}
                    </VStack>
                </HeaderLayout.Content>
            </HeaderLayout>
        </Box>
    );
};
