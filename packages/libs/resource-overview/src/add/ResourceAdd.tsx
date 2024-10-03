import { Box, Button, Header, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGlobalState } from "../global-state/useGlobalState";
import { AddModal, ErrorType, ResourceAddProps, useFormRef } from "./AddModal";
import { useResourceAddTranslations } from "./translations/useResourceAddTranslations";
import { useResourceAdd } from "./useResourceAdd";

const OldResourceAdd = (props: ResourceAddProps) => {
    const { renderAdd } = props;
    const { t } = useResourceAddTranslations();
    const { setIsSaveButtonDisabled, isSaveButtonDisabled } = useResourceAdd();

    const [state, send] = useGlobalState();
    const formRef = useFormRef();

    const {
        meta: {
            list: { getListTitle },
            resourceOverview: { getResourceName },
        },
    } = state;

    const onSubmit = () => send("SAVE");
    const onAfterSubmit = () => send("SAVED");
    const openDetails = (resourceId: string) => send({ type: "OPEN_DETAILS", selectedResourceId: resourceId });
    const onSubmitError = (errorType: ErrorType) =>
        send("ERROR", {
            errorType,
        });
    const onCancel = () => send("CANCEL");

    let saveCallback: () => void | undefined;

    const setSaveCallback = (saveCallbackFunction: () => void) => {
        saveCallback = saveCallbackFunction;
    };

    return (
        <VStack align="flex-start" padding="6">
            <Header>
                <Header.Title
                    parentTitle={getListTitle()}
                    title={`${t("Add Resource", { resource: getResourceName() })}`}
                    hasReturnMarker
                    returnMarkerAriaLabel={t("Return to list")}
                    isLoading={state.matches({ add: "loading" })}
                    onClick={() => send("CLOSE")}
                />
                <Header.Controls>
                    <Button
                        isDisabled={isSaveButtonDisabled}
                        onClick={() => {
                            formRef?.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                            if (saveCallback) {
                                saveCallback();
                            }
                        }}
                        isLoading={state.matches({ add: "saving" })}
                    >
                        {t("Save")}
                    </Button>
                </Header.Controls>
            </Header>
            <Box w="full">
                {renderAdd({
                    onSubmit,
                    onAfterSubmit,
                    onSubmitError,
                    formRef,
                    setSaveCallback,
                    setIsSaveButtonDisabled,
                    openDetails,
                    onCancel,
                })}
            </Box>
        </VStack>
    );
};

export const ResourceAdd = (props: ResourceAddProps) => {
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const withNewLayout = isFeatureFlagEnabled("iq-777-resource-management");

    return withNewLayout ? <AddModal {...props} /> : <OldResourceAdd {...props} />;
};

export type { RenderAddHandler, ResourceAddProps, RenderAddHandlerProps, ErrorType } from "./AddModal";
