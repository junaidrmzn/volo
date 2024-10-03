import { Box, Heading, useDisclosure } from "@volocopter/design-library-react";
import type { AircraftType, AircraftTypeUpdate } from "@voloiq/aircraft-management-api/v1";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { useUpdateAircraftTypeWithConfirmation } from "../../api-hooks/useAircraftTypeService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { AircraftResourceTable } from "../AircraftResourceTable";
import { MassAndBalancePointTable } from "../MassAndBalancePointTable";
import { EditAircraftTypeConfirmation } from "./EditAircraftTypeConfirmation";
import { EditAircraftTypeFormFields } from "./EditAircraftTypeFormFields";
import { useAircraftTypeEditForm } from "./useAircraftTypeEditForm";

export type EditAircraftTypeProps = RenderEditHandlerProps<AircraftType>;

export const EditAircraftType = (props: EditAircraftTypeProps) => {
    const { formRef, resource, onSubmitError, onSubmit, onAfterSubmit } = props;
    const { id: aircraftTypeId, version } = resource;
    const {
        FormControl,
        editAircraftTypeSchema,
        aircraftTypeInitialValues,
        isAircraftTypeEditFieldName,
        aircraftResources,
        massAndBalanceLongPoints,
        massAndBalanceLatPoints,
        baseValues,
    } = useAircraftTypeEditForm({ resource });

    const { t } = useResourcesTranslation();

    const { onClose, isOpen, onOpen } = useDisclosure();

    const { sendRequestById, isConfirmationNeeded, informationToConfirm, updateConfirmed, setAircraftTypeUpdateData } =
        useUpdateAircraftTypeWithConfirmation({
            onOpenConfirmationModal: onOpen,
            aircraftTypeId: aircraftTypeId || "-1",
            version,
        });
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: AircraftTypeUpdate }) =>
            sendRequestById(aircraftTypeId || "-1", { ...requestConfig, params: { version } }),
        schema: editAircraftTypeSchema,
        isFieldName: isAircraftTypeEditFieldName,
    });

    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                formId="aircraftTypeEditForm"
                schema={editAircraftTypeSchema}
                formType="edit"
                initialValues={aircraftTypeInitialValues}
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onEdit={async (formData: Record<string, any>): Promise<any> => {
                    try {
                        const data: AircraftTypeUpdate = {
                            validFrom: formData.validFrom ? formData.validFrom.toISOString() : "",
                            validTo: formData.validTo ? formData.validTo.toISOString() : "",
                            minimumTemperature: Number(baseValues.minimumTemperature),
                            maximumTemperature: Number(baseValues.maximumTemperature),
                            windSpeed: Number(baseValues.windSpeed),
                            relativeHumidity: Number(baseValues.relativeHumidity),
                            rain: Number(baseValues.rain),
                            visibility: Number(baseValues.visibility),
                            cloudCeilingHeight: Number(baseValues.cloudCeilingHeight),
                            airDensity: Number(baseValues.airDensity),
                            performanceModel: formData.performanceModel.value,
                            maxDurationToCsfl: Number(baseValues.maxDurationToCsfl),
                            voltageThreshold: Number(baseValues.voltageThreshold),
                        };

                        setAircraftTypeUpdateData(data);
                        const hasError = await makeRequestWithErrorHandling({
                            ...data,
                            massAndBalanceData: {
                                cgPosition: {
                                    x: formData.mbCgPositionX,
                                    y: formData.mbCgPositionY,
                                },
                                bem: Number(baseValues.mbBem),
                                mtom: Number(baseValues.mbMtom),
                                longCgEnvelopePoints: massAndBalanceLongPoints.values.map((point) => ({
                                    m: point.m,
                                    kg: point.kg,
                                })),
                                latCgEnvelopePoints: massAndBalanceLatPoints.values.map((point) => ({
                                    m: point.m,
                                    kg: point.kg,
                                })),
                            },
                            aircraftResources: aircraftResources.values
                                .filter((aircraftResource) => !aircraftResource.editMode)
                                .map((aircraftResource) => {
                                    const { editMode, ...restOfAircraftResource } = aircraftResource;

                                    return restOfAircraftResource;
                                }),
                        });
                        if (!hasError) onSubmit();
                    } catch {
                        onSubmitError("GENERIC");
                    }
                }}
            >
                <EditAircraftTypeFormFields resource={resource} FormControl={FormControl} version={version} />
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {t("aircraft-type.massAndBalancePosition")}
                </Heading>
                <MassAndBalancePointTable
                    heading={t("aircraft-type.model.massAndBalanceData longCgEnvelopePoints")}
                    massAndBalancePoints={massAndBalanceLongPoints.values}
                    massAndBalanceDisplayPoints={massAndBalanceLongPoints.displayValues}
                    onAdd={massAndBalanceLongPoints.handleAdd}
                    onCheck={massAndBalanceLongPoints.toggleEditMode}
                    onDelete={massAndBalanceLongPoints.handleDelete}
                    onChange={massAndBalanceLongPoints.handleChange}
                />
                <MassAndBalancePointTable
                    heading={t("aircraft-type.model.massAndBalanceData latCgEnvelopePoints")}
                    massAndBalancePoints={massAndBalanceLatPoints.values}
                    massAndBalanceDisplayPoints={massAndBalanceLatPoints.displayValues}
                    onAdd={massAndBalanceLatPoints.handleAdd}
                    onCheck={massAndBalanceLatPoints.toggleEditMode}
                    onDelete={massAndBalanceLatPoints.handleDelete}
                    onChange={massAndBalanceLatPoints.handleChange}
                />
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {t("aircraft-type.aircraftResources")}
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

            {isConfirmationNeeded && (
                <EditAircraftTypeConfirmation
                    isOpen={isOpen}
                    informationToConfirm={informationToConfirm}
                    onClose={onClose}
                    onUpdateConfirmation={updateConfirmed}
                />
            )}
        </Box>
    );
};
