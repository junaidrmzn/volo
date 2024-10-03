import { Box } from "@volocopter/design-library-react";
import { PassengerCheckinType } from "@voloiq-typescript-api/vertiport-management-types";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import type { VertiportCreate } from "@voloiq/vertiport-management-api/v1";
import { useCreateVertiport } from "../../api-hooks/useVertiportService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { ApproachDirectionsTable } from "../approach-directions/ApproachDirectionsTable";
import { useApproachDirections } from "../approach-directions/useApproachDirections";
import { GoAroundEnergiesTable } from "../go-around-energies/GoAroundEnergiesTable";
import { useGoAroundEnergies } from "../go-around-energies/useGoAroundEnergies";
import { CreateVertiportFormFields } from "./CreateVertiportFormFields";
import { useCreateVertiportFormFields } from "./useCreateVertiportFormFields";

type RegionCreateProps = RenderAddHandlerProps;
export const CreateVertiport = (props: RegionCreateProps) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { createVertiportSchema, isCreateVertiportFieldName, baseValues, FormControl, regions } =
        useCreateVertiportFormFields();
    const { sendRequest } = useCreateVertiport();
    const { t } = useVertiportTranslation();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: createVertiportSchema,
        isFieldName: isCreateVertiportFieldName,
    });
    const { goAroundEnergies, goAroundEnergiesDisplayValues, handleAdd, handleChange, handleDelete, toggleEditMode } =
        useGoAroundEnergies();

    const {
        approachDirections,
        approachDirectionsDisplayValues,
        handleAdd: handleAddApproachDirection,
        handleChange: handleChangeApproachDirection,
        handleDelete: handleDeleteApproachDirection,
        toggleEditMode: toggleEditModeApproachDirection,
    } = useApproachDirections();

    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Box background="mono500Gray750" borderRadius="md" padding={4}>
            <FormProvider
                formId="vertiportCreateForm"
                schema={createVertiportSchema}
                formType="create"
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                initialValues={{
                    validFrom: new Date(),
                    passengerCheckinType: {
                        value: PassengerCheckinType.NOT_ALLOWED,
                        label: PassengerCheckinType.NOT_ALLOWED,
                    },
                }}
                onCreate={async (vertiportFormData) => {
                    onSubmit();
                    try {
                        const coordinates = vertiportFormData.coordinates.split(",").map((value) => value.trim());
                        const data: VertiportCreate = {
                            goAroundEnergies: goAroundEnergies.map((energy) => ({
                                direction: energy.direction,
                                goAroundEnergy: energy.goAroundEnergy,
                            })),
                            ...(isFeatureFlagEnabled("vao-1577") && {
                                approachDirections: approachDirections.map(
                                    (approachDirection) => approachDirection.direction
                                ),
                            }),
                            countryCode: vertiportFormData.countryCode,
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
                            iataCode: vertiportFormData.iataCode ?? undefined,
                            icaoCode: vertiportFormData.icaoCode ?? undefined,
                            code: vertiportFormData.code,
                            shortName: vertiportFormData.shortName,
                            regionId: vertiportFormData.regionId?.value ? vertiportFormData.regionId.value : undefined,
                            timeZone: vertiportFormData.timeZone ? vertiportFormData.timeZone : undefined,
                            elevation: Number(baseValues.elevation),
                            location: {
                                longitude: Number(coordinates[1]) ?? 0,
                                latitude: Number(coordinates[0]) ?? 0,
                                height: vertiportFormData.elevation,
                            },
                            services: vertiportFormData.services
                                ? vertiportFormData.services?.map((service) => ({
                                      serviceKey: service.label,
                                      available: true,
                                  }))
                                : [],
                            operation: {
                                MinGroundTimePre: {
                                    batterySwap: vertiportFormData.preBatterySwap
                                        ? +Number.parseFloat(Number(baseValues.preBatterySwap).toFixed(2))
                                        : undefined,
                                    passengerHandling: vertiportFormData.prePassengerHandling
                                        ? +Number.parseFloat(Number(baseValues.prePassengerHandling).toFixed(2))
                                        : undefined,
                                    pilotBriefing: vertiportFormData.prePilotBriefing
                                        ? +Number.parseFloat(Number(baseValues.prePilotBriefing).toFixed(2))
                                        : undefined,
                                    vtolHandling: vertiportFormData.preVtolHandling
                                        ? +Number.parseFloat(Number(baseValues.preVtolHandling).toFixed(2))
                                        : undefined,
                                },
                                MinGroundTimePost: {
                                    batterySwap: vertiportFormData.postBatterySwap
                                        ? +Number.parseFloat(Number(baseValues.postBatterySwap).toFixed(2))
                                        : undefined,
                                    passengerHandling: vertiportFormData.postPassengerHandling
                                        ? +Number.parseFloat(Number(baseValues.postPassengerHandling).toFixed(2))
                                        : undefined,
                                    pilotBriefing: vertiportFormData.postPilotBriefing
                                        ? +Number.parseFloat(Number(baseValues.postPilotBriefing).toFixed(2))
                                        : undefined,
                                    vtolHandling: vertiportFormData.postVtolHandling
                                        ? +Number.parseFloat(Number(baseValues.postVtolHandling).toFixed(2))
                                        : undefined,
                                },
                                fatoBlockingTimePre: vertiportFormData.fatoBlockingTimePre
                                    ? +Number.parseFloat(Number(baseValues.fatoBlockingTimePre).toFixed(2))
                                    : undefined,
                                fatoBlockingTimePost: vertiportFormData.fatoBlockingTimePost
                                    ? +Number.parseFloat(Number(baseValues.fatoBlockingTimePost).toFixed(2))
                                    : undefined,
                                additionalFiles: vertiportFormData.additionalFiles
                                    ? vertiportFormData.additionalFiles.map((file) => ({
                                          key: file.label!!,
                                          url: file.value,
                                      }))
                                    : [],
                                serviceHours: [],
                            },
                            address: {
                                country: vertiportFormData.country,
                                state: vertiportFormData.state,
                                city: vertiportFormData.city,
                                zipCode: vertiportFormData.zipCode,
                                addressLine1: vertiportFormData.addressLine1,
                                addressLine2: vertiportFormData.addressLine2,
                            },
                            names: vertiportFormData.names
                                ? vertiportFormData.names?.map((file) => ({ key: file.label!!, value: file.value }))
                                : [],
                            images: vertiportFormData.images
                                ? vertiportFormData.images?.map((file) => ({ key: file.label!!, value: file.value }))
                                : [],
                            popularity: vertiportFormData.popularity ? +vertiportFormData.popularity : 0,
                            dataModelVersion: 1,
                        };
                        return await makeRequestWithErrorHandling(data);
                    } catch {
                        onSubmitError("GENERIC");
                        return {};
                    }
                }}
            >
                <CreateVertiportFormFields FormControl={FormControl} regions={regions} selectedRegion={undefined} />

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
