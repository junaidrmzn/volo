import { HStack, Icon, IconButton, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { AnyObjectSchema, InitialValues, OnEditHandler } from "@voloiq/form";
import { SectionHeader } from "@voloiq/text-layouts";
import type { EditResourceFormProps } from "./EditResourceForm";
import { EditResourceFormModal } from "./EditResourceFormModal";
import { useResourceSectionTranslation } from "./translations/useResourceSectionTranslation";

export type ResourceSectionProps<Schema extends AnyObjectSchema, Resource extends {}> = {
    resourceNameSingular: string;
    resource?: Resource;
    renderResource: (resources: Resource) => ReactElement | null;
    getInitialValues: (resource: Resource) => InitialValues<Schema>;
    hasSubSections?: boolean;
    isEditable?: boolean;
} & Pick<EditResourceFormProps<Schema>, "formSchema" | "renderFormControls" | "onEdit">;

export const ResourceSection = <Schema extends AnyObjectSchema, Resource extends {}>(
    props: ResourceSectionProps<Schema, Resource>
) => {
    const {
        resourceNameSingular,
        onEdit: _onEdit,
        resource,
        renderResource,
        formSchema,
        renderFormControls,
        getInitialValues,
        hasSubSections = false,
        isEditable = true,
    } = props;
    const { t } = useResourceSectionTranslation();
    const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
    const onEdit: OnEditHandler<Schema> = async (...args) => {
        onCloseEditModal();
        await _onEdit(...args);
    };

    if (resource === undefined) {
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
            <HStack {...(hasSubSections && { px: "4.5" })}>
                <SectionHeader label={resourceNameSingular}>
                    {isEditable && (
                        <IconButton
                            aria-label={t("Edit {resource}", { resource: resourceNameSingular })}
                            variant="ghost"
                            size="md"
                            onClick={onOpenEditModal}
                        >
                            <Icon icon="penWithBox" size={4} />
                        </IconButton>
                    )}
                </SectionHeader>
            </HStack>
            {renderResource(resource)}
            <EditResourceFormModal
                onEdit={onEdit}
                isOpen={isEditModalOpen}
                onClose={onCloseEditModal}
                formSchema={formSchema}
                renderFormControls={renderFormControls}
                initialValues={getInitialValues(resource)}
                resourceNameSingular={resourceNameSingular}
            />
        </VStack>
    );
};
