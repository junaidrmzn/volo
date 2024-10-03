import { Box, Button, Heading, Icon } from "@volocopter/design-library-react";
import type { Service } from "@voloiq-typescript-api/aircraft-management-types";
import type { Aircraft, AircraftUpdate } from "@voloiq/aircraft-management-api/v1";
import type { SelectOption } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { AircraftResourceTable } from "../../aircraft-type/AircraftResourceTable";
import { MassAndBalanceDataTable } from "../../aircraft-type/MassAndBalanceDataTable";
import { MassAndBalancePointTable } from "../../aircraft-type/MassAndBalancePointTable";
import { useUpdateAircraft } from "../../api-hooks/useAircraftService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";
import { useGetAirCraftValidToDate } from "../utils/GetAirCraftValidToDate";
import { EditAircraftFormFields } from "./EditAircraftFormFields";
import { useAircraftEditForm } from "./useAircraftEditForm";

type AircraftEditProps = RenderEditHandlerProps<Aircraft>;
export const AircraftEdit = (props: AircraftEditProps) => {
    const { formRef, resource, onSubmitError, onSubmit, onAfterSubmit } = props;
    const { id: aircraftId, version } = resource;
    const {
        editAircraftSchema,
        aircraftInitialValues,
        isEditAircraftFieldName,
        aircraftResources,
        massAndBalanceLongPoints,
        massAndBalanceLatPoints,
        massAndBalanceData,
        resetAircraftTypeData,
    } = useAircraftEditForm({ resource });
    const { getValidToDate } = useGetAirCraftValidToDate();

    const { t: resourceTranslation } = useResourcesTranslation();
    const { t: aircraftTranslation } = useAircraftTranslation();

    const { sendRequestById } = useUpdateAircraft();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: AircraftUpdate }) =>
            sendRequestById(aircraftId || "-1", { ...requestConfig, params: { version } }),
        schema: editAircraftSchema,
        isFieldName: isEditAircraftFieldName,
    });

    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                formId="aircraftEditForm"
                schema={editAircraftSchema}
                formType="edit"
                formRef={formRef}
                initialValues={aircraftInitialValues}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onEdit={async (aircraftFormData: Record<string, any>): Promise<any> => {
                    try {
                        const data: AircraftUpdate = {
                            msn: aircraftFormData.msn,
                            registration: aircraftFormData.registration ? aircraftFormData.registration : null,
                            services: aircraftFormData.services.map(
                                (service: SelectOption) => service.value as Service
                            ),
                            technicalStatus: aircraftFormData.technicalStatus.value,
                            homebaseVertiportId: aircraftFormData.homebaseVertiport.value,
                            crewConfiguration: aircraftFormData.crewConfiguration.value,
                            validFrom: aircraftFormData.validFrom ? aircraftFormData.validFrom.toISOString() : "",
                            validTo: aircraftFormData.validTo
                                ? aircraftFormData.validTo.toISOString()
                                : getValidToDate(
                                      aircraftFormData.aircraftType.value,
                                      aircraftFormData.homebaseVertiport.value
                                  ),
                            massAndBalanceData: {
                                ...massAndBalanceData.values,
                                longCgEnvelopePoints: massAndBalanceLongPoints.values,
                                latCgEnvelopePoints: massAndBalanceLatPoints.values,
                            },
                            aircraftResources: aircraftResources.values.map((aircraftResource) => {
                                const { id, ...aircraftResourceWithoutId } = aircraftResource;
                                return aircraftResourceWithoutId;
                            }),
                        };
                        const hasError = await makeRequestWithErrorHandling(data);
                        if (!hasError) onSubmit();
                    } catch {
                        onSubmitError("GENERIC");
                    }
                }}
            >
                <EditAircraftFormFields resource={resource} />
                <div>
                    <Button
                        variant="ghost"
                        leftIcon={<Icon icon="repeat" />}
                        onClick={() => resetAircraftTypeData()}
                        size="lg"
                    >
                        {aircraftTranslation("edit.reset")}
                    </Button>
                </div>
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {resourceTranslation("aircraft-type.massAndBalanceData")}
                </Heading>
                <MassAndBalanceDataTable
                    massAndBalanceData={massAndBalanceData.values}
                    onChange={massAndBalanceData.handleChange}
                />
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {resourceTranslation("aircraft-type.massAndBalancePosition")}
                </Heading>
                <MassAndBalancePointTable
                    heading={resourceTranslation("aircraft-type.model.massAndBalanceData longCgEnvelopePoints")}
                    massAndBalancePoints={massAndBalanceLongPoints.values}
                    massAndBalanceDisplayPoints={massAndBalanceLongPoints.displayValues}
                    onAdd={massAndBalanceLongPoints.handleAdd}
                    onCheck={massAndBalanceLongPoints.toggleEditMode}
                    onDelete={massAndBalanceLongPoints.handleDelete}
                    onChange={massAndBalanceLongPoints.handleChange}
                />
                <MassAndBalancePointTable
                    heading={resourceTranslation("aircraft-type.model.massAndBalanceData latCgEnvelopePoints")}
                    massAndBalancePoints={massAndBalanceLatPoints.values}
                    massAndBalanceDisplayPoints={massAndBalanceLatPoints.displayValues}
                    onAdd={massAndBalanceLatPoints.handleAdd}
                    onCheck={massAndBalanceLatPoints.toggleEditMode}
                    onDelete={massAndBalanceLatPoints.handleDelete}
                    onChange={massAndBalanceLatPoints.handleChange}
                />
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {resourceTranslation("aircraft-type.aircraftResources")}
                </Heading>
                <AircraftResourceTable
                    aircraftResources={aircraftResources.values}
                    aircraftResourcesDisplayValues={aircraftResources.displayValues}
                    onAdd={aircraftResources.handleAdd}
                    onCheck={aircraftResources.toggleEditMode}
                    onDelete={aircraftResources.handleDelete}
                    onChange={aircraftResources.handleChange}
                />
            </FormProvider>
        </Box>
    );
};
