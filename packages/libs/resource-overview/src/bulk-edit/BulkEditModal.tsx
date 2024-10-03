import {
    Button,
    Divider,
    HStack,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure,
} from "@volocopter/design-library-react";
import { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import { FilterSet } from "@voloiq/filter-panel";
import { AnyObjectSchema, SelectOption } from "@voloiq/form";
import { ResourceFilterBar } from "../filter-bar/ResourceFilterBar";
import { useGlobalState } from "../global-state/useGlobalState";
import { BaseResource } from "../state-machine/BaseResource";
import { useResourceBulkEditTranslations } from "./translations/useResourceBulkEditTranslations";

export const useFormRef = () => useRef<HTMLFormElement | null>(null);

export type ChangeToType = SelectOption | SelectOption[] | number | string | boolean;

export type ErrorType = "ALREADY_EXISTS" | "GENERIC" | "BACKEND_FORM_ERROR";

export type BulkEditData = {
    fieldType: string;
    newValue: string | SelectOption[] | null;
};

export type BulkEditResourceOptions<Resource> = {
    filterSet: FilterSet<Resource>;
    data: BulkEditData;
};
export type BulkEditResourcesHandler<Resource extends BaseResource> = (
    options: BulkEditResourceOptions<Resource>
) => Promise<Resource[] | undefined>;

export type RenderBulkEditHandlerProps<Resource extends BaseResource> = {
    onSubmit: () => void;
    onAfterSubmit: () => void;
    onSubmitError: (type: ErrorType) => void;
    bulkEditResource: BulkEditResourcesHandler<Resource>;
    formRef: MutableRefObject<HTMLFormElement | null>;
    schema: AnyObjectSchema;
    totalItems: number;
    filterSet: FilterSet<Resource>;
    isOpenConfirmModal: boolean;
    onOpenConfirmModal: () => void;
    onCloseConfirmModal: () => void;
    isLoading: boolean;
};

export type RenderBulkEditHandler<Resource extends BaseResource> = (
    props: RenderBulkEditHandlerProps<Resource>
) => ReactNode;

export type ResourceBulkEditProps<Resource extends BaseResource> = {
    renderBulkEdit: RenderBulkEditHandler<Resource>;
};

const useBulkEditModal = () => {
    const [state] = useGlobalState();
    const { isOpen: isOpenBulkEditModal, onOpen: onOpenBulkEditModal, onClose: onCloseBulkEditModal } = useDisclosure();
    const { isOpen: isOpenConfirmModal, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();

    useEffect(() => {
        if (state.matches("bulk_edit") && !state.matches({ bulk_edit: "closed" }) && !isOpenBulkEditModal) {
            onOpenBulkEditModal();
        }
    });

    return {
        isOpenBulkEditModal,
        onOpenBulkEditModal,
        onCloseBulkEditModal,
        isOpenConfirmModal,
        onOpenConfirmModal,
        onCloseConfirmModal,
    };
};

export const BulkEditModal = <Resource extends BaseResource>(props: ResourceBulkEditProps<Resource>) => {
    const { renderBulkEdit } = props;

    const [state, send] = useGlobalState();
    const formRef = useFormRef();
    const { isOpenBulkEditModal, onCloseBulkEditModal, isOpenConfirmModal, onOpenConfirmModal, onCloseConfirmModal } =
        useBulkEditModal();
    const { t } = useResourceBulkEditTranslations();

    const {
        context: { selectedResource, selectedResourceId, bulkEditResource, schema, totalItems, appliedFilterSet },
        meta: {
            resourceOverview: { getResourceName },
            bulk_edit: { getBulkEditTitle },
        },
    } = state;

    const onSubmit = () => send("SAVE");
    const onAfterSubmit = () => {
        send([{ type: "SAVED" }, { type: "RELOAD_LIST" }]);
        if (state.matches("preview") && !state.matches("preview.closed"))
            send({ type: "RELOAD_PREVIEW", selectedResourceId });
    };
    const onSubmitError = (errorType: ErrorType = "GENERIC") => send("ERROR", { errorType });

    const onCancel = () => {
        onCloseBulkEditModal();
        send("CLOSE_BULK");
    };

    const title = getBulkEditTitle?.(selectedResource) || getResourceName();
    const isLoading = state.matches({ bulk_edit: "saving" });

    return (
        <Modal {...props} isOpen={isOpenBulkEditModal} onClose={onCloseBulkEditModal} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onCancel} />
                <ModalHeader display="flex" alignItems="center">
                    {t("Bulk Edit")}&nbsp;<Heading>-&nbsp;{title}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <HStack>
                        <Text fontWeight="bold">{t("entries", { entries: totalItems })}</Text>
                        <Text>{t("Matching your filter and about to be edited")}</Text>
                    </HStack>
                    <ResourceFilterBar mt={3} mb={6} isReadOnly />
                    <VStack alignItems="start">
                        {renderBulkEdit({
                            onSubmit,
                            onAfterSubmit,
                            onSubmitError,
                            bulkEditResource,
                            formRef,
                            schema,
                            totalItems,
                            filterSet: appliedFilterSet,
                            isOpenConfirmModal,
                            onOpenConfirmModal,
                            onCloseConfirmModal,
                            isLoading,
                        })}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCancel} variant="secondary">
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="primary"
                        isLoading={isLoading}
                        onClick={() => {
                            formRef?.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                        }}
                    >
                        {t("Done")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
