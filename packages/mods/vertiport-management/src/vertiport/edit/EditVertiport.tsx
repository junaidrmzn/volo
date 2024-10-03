import { Box } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import type { Vertiport, VertiportUpdate } from "@voloiq/vertiport-management-api/v1";
import { useUpdateVertiport } from "../../api-hooks/useVertiportService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { ApproachDirectionsTable } from "../approach-directions/ApproachDirectionsTable";
import { GoAroundEnergiesTable } from "../go-around-energies/GoAroundEnergiesTable";
import { EditVertiportFormFields } from "./EditVertiportFormFields";
import { useEditVertiportFormFields } from "./useEditVertiportFormFields";

type VertiportEditProps = RenderEditHandlerProps<Vertiport>;
export const EditVertiport = (props: VertiportEditProps) => {
    const { formRef, resource, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { id: vertiportId } = resource;
    const {
        goAroundEnergies,
        goAroundEnergiesDisplayValues,
        handleAdd,
        handleChange,
        handleDelete,
        toggleEditMode,
        approachDirections,
        approachDirectionsDisplayValues,
        handleAddApproachDirection,
        handleChangeApproachDirection,
        handleDeleteApproachDirection,
        toggleEditModeApproachDirection,
        vertiportInitialValues,
        editVertiportSchema,
        isEditVertiportFieldName,
        version,
        baseValues,
        FormControl,
    } = useEditVertiportFormFields(resource);
    const { t } = useVertiportTranslation();
    const { sendRequestById } = useUpdateVertiport();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: VertiportUpdate }) =>
            sendRequestById(vertiportId || "-1", { ...requestConfig, params: { version } }),
        schema: editVertiportSchema,
        isFieldName: isEditVertiportFieldName,
    });
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Box background="mono500Gray750" borderRadius="md" padding={4}>
            <FormProvider
                formId="vertiportEditForm"
                schema={editVertiportSchema}
                formType="edit"
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                initialValues={vertiportInitialValues}
                onEdit={async (vertiportFormData) => {
                    onSubmit();
                    try {
                        const coordinates = vertiportFormData.coordinates.split(",").map((value) => value.trim());
                        const data: VertiportUpdate = {
                            id: vertiportId ?? "-",
                            goAroundEnergies: goAroundEnergies.map((energy) => ({
                                direction: energy.direction,
                                goAroundEnergy: energy.goAroundEnergy,
                            })),
                            ...(isFeatureFlagEnabled("vao-1577") && {
                                approachDirections: approachDirections.map(
                                    (approachDirection) => approachDirection.direction
                                ),
                            }),
                            countryCode: vertiportFormData.countryCode ?? "",
                            passengerCheckinType: vertiportFormData.passengerCheckinType
                                ? vertiportFormData.passengerCheckinType.value
                                : undefined,
                            name: vertiportFormData.name,
                            validFrom: vertiportFormData.validFrom ? vertiportFormData.validFrom.toISOString() : "",
                            validTo: vertiportFormData.validTo ? vertiportFormData.validTo.toISOString() : undefined,
                            publicFrom: vertiportFormData.publicFrom
                                ? vertiportFormData.publicFrom.toISOString()
                                : undefined,
                            publicTo: vertiportFormData.publicTo ? vertiportFormData.publicTo.toISOString() : undefined,
                            iataCode: vertiportFormData.iataCode ? vertiportFormData.iataCode : undefined,
                            icaoCode: vertiportFormData.icaoCode ? vertiportFormData.icaoCode : undefined,
                            code: vertiportFormData.code,
                            shortName: vertiportFormData.shortName,
                            regionId: vertiportFormData.regionId.value,
                            timeZone: vertiportFormData.timeZone ? vertiportFormData.timeZone : undefined,
                            elevation: Number(baseValues.elevation),
                            location: {
                                longitude: coordinates[1] ? Number(coordinates[1]) : 0,
                                latitude: coordinates[0] ? Number(coordinates[0]) : 0,
                                height: vertiportFormData.elevation,
                            },
                            services: vertiportFormData.services
                                ? vertiportFormData.services.map((service) => ({
                                      serviceKey: service.value,
                                      available: true,
                                  }))
                                : [],
                            operation: {
                                MinGroundTimePre: {
                                    batterySwap: +Number.parseFloat(Number(baseValues.preBatterySwap ?? 0).toFixed(2)),
                                    passengerHandling: +Number.parseFloat(
                                        Number(baseValues.prePassengerHandling ?? 0).toFixed(2)
                                    ),
                                    pilotBriefing: +Number.parseFloat(
                                        Number(baseValues.prePilotBriefing ?? 0).toFixed(2)
                                    ),
                                    vtolHandling: +Number.parseFloat(
                                        Number(baseValues.preVtolHandling ?? 0).toFixed(2)
                                    ),
                                },
                                MinGroundTimePost: {
                                    batterySwap: +Number.parseFloat(Number(baseValues.postBatterySwap ?? 0).toFixed(2)),
                                    passengerHandling: +Number.parseFloat(
                                        Number(baseValues.postPassengerHandling ?? 0).toFixed(2)
                                    ),
                                    pilotBriefing: +Number.parseFloat(
                                        Number(baseValues.postPilotBriefing ?? 0).toFixed(2)
                                    ),
                                    vtolHandling: +Number.parseFloat(
                                        Number(baseValues.postVtolHandling ?? 0).toFixed(2)
                                    ),
                                },
                                fatoBlockingTimePre: +Number.parseFloat(
                                    Number(baseValues.fatoBlockingTimePre ?? 0).toFixed(2)
                                ),
                                fatoBlockingTimePost: +Number.parseFloat(
                                    Number(baseValues.fatoBlockingTimePost ?? 0).toFixed(2)
                                ),
                                additionalFiles: vertiportFormData.additionalFiles
                                    ? vertiportFormData.additionalFiles.map((file) => ({
                                          key: file.label ?? "",
                                          url: file.value,
                                      }))
                                    : [],
                                serviceHours: [],
                            },
                            address: {
                                country: vertiportFormData.country ?? "",
                                state: vertiportFormData.state ?? "",
                                city: vertiportFormData.city ?? "",
                                zipCode: vertiportFormData.zipCode ?? "",
                                addressLine1: vertiportFormData.addressLine1 ?? "",
                                addressLine2: vertiportFormData.addressLine2 ?? "",
                            },
                            names: vertiportFormData.names
                                ? vertiportFormData.names.map((file) => ({ key: file.label ?? "", value: file.value }))
                                : [],
                            images: vertiportFormData.images
                                ? vertiportFormData.images.map((file) => ({ key: file.label ?? "", value: file.value }))
                                : [],
                            popularity: vertiportFormData.popularity ?? 0,
                            dataModelVersion: 1,
                        };
                        return await makeRequestWithErrorHandling(data);
                    } catch {
                        onSubmitError("GENERIC");
                        return {};
                    }
                }}
            >
                <EditVertiportFormFields
                    vertiport={resource}
                    FormControl={FormControl}
                    selectedRegion={vertiportInitialValues.regionId}
                />

                <GoAroundEnergiesTable
                    heading={t("vertiport.model.goAroundEnergies")}
                    goAroundEnergies={goAroundEnergies}
                    goAroundEnergiesDisplayValues={goAroundEnergiesDisplayValues}
                    onAdd={handleAdd}
                    onCheck={toggleEditMode}
                    onDelete={handleDelete}
                    onChange={handleChange}
                />

                {isFeatureFlagEnabled("vao-1577") && (
                    <ApproachDirectionsTable
                        heading={t("vertiport.model.approachDirections")}
                        approachDirections={approachDirections}
                        approachDirectionsDisplayValues={approachDirectionsDisplayValues}
                        onAdd={handleAddApproachDirection}
                        onCheck={toggleEditModeApproachDirection}
                        onDelete={handleDeleteApproachDirection}
                        onChange={handleChangeApproachDirection}
                    />
                )}
            </FormProvider>
        </Box>
    );
};
