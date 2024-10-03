import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { match } from "ts-pattern";
import type { AnyObjectSchema, InitialValues } from "@voloiq/form";
import { ModalHeaderLayout, SectionHeader } from "@voloiq/text-layouts";
import { AddButton } from "../add-button/AddButton";
import type { BulkResourceFormModalProps } from "../bulk-resource-form-modal/BulkResourceFormModal";
import { BulkResourceFormModal } from "../bulk-resource-form-modal/BulkResourceFormModal";
import { EditButton } from "../edit-button/EditButton";
import { QueryClientProvider } from "../query-client-provider/QueryClientProvider";
import { useBulkResourceSectionTranslation } from "./translations/useBulkResourceSectionTranslation";

export type DisabledResourceCreationProps = {
    isCreationDisabled: true;
    renderDisabledCreationExplanation: () => ReactElement | null;
};
export type EnabledResourceCreationProps = {
    isCreationDisabled?: never;
    renderDisabledCreationExplanation?: never;
};
export type ToggleableResourceCreationProps = DisabledResourceCreationProps | EnabledResourceCreationProps;

export type BulkResourceSectionProps<Schema extends AnyObjectSchema, Resources extends {}[]> = {
    resourceNamePlural: string;
    resourceNameSingular: string;
    formSchema: Schema;
    onBulkAdd: BulkResourceFormModalProps<Schema>["onAdd"];
    onBulkEdit: BulkResourceFormModalProps<Schema>["onEdit"];
    onBulkDelete: BulkResourceFormModalProps<Schema>["onDelete"];
    getAllResources: () => Promise<Resources | undefined>;
    renderResources?: (resources: Resources) => ReactElement | null;
    getInitialValues: (resources: Resources) => InitialValues<Schema>[];
    overrideOnAfterSubmit?: BulkResourceFormModalProps<Schema>["onAfterSubmit"];
    isEditable?: boolean;
    hasSubSections?: boolean;
} & Pick<
    BulkResourceFormModalProps<Schema>,
    "renderFormControlGroup" | "deleteButtonProps" | "withDeleteButton" | "withAddNewButton" | "isSortable"
> &
    ToggleableResourceCreationProps;

const BulkResourceSectionWithoutProvider = <Schema extends AnyObjectSchema, Resources extends {}[]>(
    props: BulkResourceSectionProps<Schema, Resources>
) => {
    const {
        resourceNamePlural,
        resourceNameSingular,
        getAllResources,
        renderFormControlGroup,
        renderResources,
        formSchema,
        onBulkAdd,
        onBulkEdit,
        onBulkDelete,
        isCreationDisabled,
        getInitialValues,
        deleteButtonProps,
        withAddNewButton,
        withDeleteButton,
        overrideOnAfterSubmit,
        isSortable,
        isEditable = true,
        hasSubSections = false,
    } = props;
    const { t } = useBulkResourceSectionTranslation();
    const { isOpen: isEditing, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
    const queryClient = useQueryClient();
    const { data: resources } = useQuery({ queryKey: ["resources"], queryFn: getAllResources });
    const onAfterSubmit = () => overrideOnAfterSubmit?.() || queryClient.invalidateQueries(["resources"]);

    const buttonProps = {
        resourceName: resourceNamePlural,
        onClick: onOpenEditModal,
        isDisabled: isCreationDisabled,
    };

    if (resources === undefined) {
        return null;
    }

    return (
        <VStack
            spacing={6}
            boxSize="full"
            alignItems="stretch"
            role="region"
            aria-label={resourceNameSingular}
            {...(hasSubSections && { bg: "bgContentLayer", borderRadius: "sm" })}
        >
            <VStack {...(hasSubSections && { px: "4.5" })}>
                <SectionHeader label={resourceNamePlural}>
                    {isEditable &&
                        (resources && resources.length > 0 ? (
                            <EditButton {...buttonProps} />
                        ) : (
                            <AddButton {...buttonProps} />
                        ))}
                </SectionHeader>
                {match({ resources, props })
                    .with({ props: { isCreationDisabled: true } }, (options) =>
                        options.props.renderDisabledCreationExplanation()
                    )
                    .when(
                        () => resources.length > 0,
                        () => <Box width="full">{renderResources?.(resources)}</Box>
                    )
                    .otherwise(() => (
                        <Button leftIcon={<Icon icon="plus" size={4} />} width="full" onClick={onOpenEditModal}>
                            {t("Add {resources}", { resources: resourceNamePlural })}
                        </Button>
                    ))}
            </VStack>
            {isEditing && (
                <BulkResourceFormModal
                    onModalClose={onCloseEditModal}
                    renderFormControlGroup={renderFormControlGroup}
                    header={
                        <ModalHeaderLayout
                            modalType={resources && resources.length > 0 ? t("Edit") : t("Add")}
                            modalTitle={resourceNamePlural}
                        />
                    }
                    entityName={resourceNameSingular}
                    schema={formSchema}
                    initialValues={getInitialValues(resources)}
                    onAdd={onBulkAdd}
                    onEdit={onBulkEdit}
                    onDelete={onBulkDelete}
                    onAfterSubmit={onAfterSubmit}
                    deleteButtonProps={deleteButtonProps}
                    withAddNewButton={withAddNewButton}
                    withDeleteButton={withDeleteButton}
                    isSortable={isSortable}
                />
            )}
        </VStack>
    );
};

export const BulkResourceSection = <Schema extends AnyObjectSchema, Resources extends {}[]>(
    props: BulkResourceSectionProps<Schema, Resources>
) => {
    return (
        <QueryClientProvider>
            <BulkResourceSectionWithoutProvider {...props} />
        </QueryClientProvider>
    );
};
