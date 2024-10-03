import { Box, Button, Header, VStack, useColorModeValue } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { EditModal, ErrorType, ResourceEditProps, useFormRef } from "./EditModal";
import { useResourceEditTranslations } from "./translations/useResourceEditTranslations";

const OldResourceEdit = <Resource extends BaseResource>(props: ResourceEditProps<Resource>) => {
    const { renderEdit } = props;
    const { t } = useResourceEditTranslations();
    const backgroundColor = useColorModeValue("monochrome.200", "monochrome.800");

    const [state, send] = useGlobalState();
    const formRef = useFormRef();

    const {
        context: { selectedResource },
        meta: {
            list: { getListTitle },
            resourceOverview: { getResourceName },
        },
    } = state;

    const onSubmit = () => send("SAVE");
    const onAfterSubmit = () => send("SAVED");
    const onSubmitError = (errorType: ErrorType = "GENERIC") =>
        send("ERROR", {
            errorType,
        });

    return (
        <VStack align="flex-start" padding="6" backgroundColor={backgroundColor} height="full">
            <Header>
                <Header.Title
                    parentTitle={getListTitle()}
                    title={`${t("Edit Resource", { resource: getResourceName() })}`}
                    hasReturnMarker
                    returnMarkerAriaLabel={t("Return to list")}
                    isLoading={state.matches({ edit: "loading" })}
                    onClick={() => send("CLOSE")}
                />
                <Header.Controls>
                    <Button
                        onClick={() => {
                            formRef?.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                        }}
                        isLoading={state.matches({ edit: "saving" })}
                    >
                        {t("Save")}
                    </Button>
                </Header.Controls>
            </Header>
            <Box w="full" p={{ base: 12, md: 0 }}>
                {renderEdit({ onSubmit, onAfterSubmit, onSubmitError, formRef, resource: selectedResource })}
            </Box>
        </VStack>
    );
};

export const ResourceEdit = <Resource extends BaseResource>(props: ResourceEditProps<Resource>) => {
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const withNewLayout = isFeatureFlagEnabled("iq-777-resource-management");

    return withNewLayout ? <EditModal {...props} /> : <OldResourceEdit {...props} />;
};

export type { RenderEditHandler, ResourceEditProps, RenderEditHandlerProps, ErrorType } from "./EditModal";
