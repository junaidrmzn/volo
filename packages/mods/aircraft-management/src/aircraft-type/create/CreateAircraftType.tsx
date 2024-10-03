import { Box, Heading } from "@volocopter/design-library-react";
import type { AircraftTypeCreate } from "@voloiq/aircraft-management-api/v1";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useCreateAircraftType } from "../../api-hooks/useAircraftTypeService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { AircraftResourceTable } from "../AircraftResourceTable";
import { MassAndBalancePointTable } from "../MassAndBalancePointTable";
import { useAircraftResources } from "../hooks/useAircraftResources";
import { useMassAndBalancePoints } from "../hooks/useMassAndBalancePoints";
import { CreateAircraftTypeFields } from "./CreateAircraftTypeFormFields";
import { useAircraftTypeCreateForm } from "./useAircraftTypeCreateForm";

export type CreateAircraftTypeProps = RenderAddHandlerProps;
export const CreateAircraftType = (props: CreateAircraftTypeProps) => {
    const { formRef, onAfterSubmit, onSubmitError, onSubmit } = props;
    const { t } = useResourcesTranslation();
    const { FormControl, createAircraftTypeSchema, isAircraftTypeCreateFormAttribute, baseValues } =
        useAircraftTypeCreateForm();
    const { sendRequest } = useCreateAircraftType();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: createAircraftTypeSchema,
        isFieldName: isAircraftTypeCreateFormAttribute,
    });
    const {
        aircraftResources,
        aircraftResourcesDisplayValues,
        handleAdd: handleArAdd,
        handleChange: handleArChange,
        handleDelete: handleArDelete,
        toggleEditMode: toggleArEditMode,
    } = useAircraftResources();

    const {
        massAndBalancePoints: massAndBalanceLongPoints,
        massAndBalanceDisplayPoints: massAndBalanceLongDisplayPoints,
        handleAdd: handleMbLongAdd,
        handleChange: handleMbLongChange,
        handleDelete: handleMbLongDelete,
        toggleEditMode: toggleMbLongEditMode,
    } = useMassAndBalancePoints();

    const {
        massAndBalancePoints: massAndBalanceLatPoints,
        massAndBalanceDisplayPoints: massAndBalanceLatDisplayPoints,
        handleAdd: handleMbLatAdd,
        handleChange: handleMbLatChange,
        handleDelete: handleMbLatDelete,
        toggleEditMode: toggleMbLatEditMode,
    } = useMassAndBalancePoints();

    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                formId="aircraftTypeCreateForm"
                schema={createAircraftTypeSchema}
                formType="create"
                initialValues={{ validFrom: new Date() }}
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onCreate={async (formData: Record<string, any>): Promise<any> => {
                    try {
                        const data: AircraftTypeCreate = {
                            name: formData.name,
                            productLine: formData.productLine.value,
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
                            maxDurationToCsfl: formData.maxDurationToCsfl,
                            voltageThreshold: formData.voltageThreshold,
                        };

                        const hasError = await makeRequestWithErrorHandling({
                            ...data,
                            massAndBalanceData: {
                                cgPosition: {
                                    x: formData.mbCgPositionX,
                                    y: formData.mbCgPositionY,
                                },
                                bem: Number(baseValues.mbBem),
                                mtom: Number(baseValues.mbMtom),
                                longCgEnvelopePoints: massAndBalanceLongPoints.map((point) => ({
                                    m: point.m,
                                    kg: point.kg,
                                })),
                                latCgEnvelopePoints: massAndBalanceLatPoints.map((point) => ({
                                    m: point.m,
                                    kg: point.kg,
                                })),
                            },
                            aircraftResources: aircraftResources
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
                <CreateAircraftTypeFields FormControl={FormControl} />
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {t("aircraft-type.massAndBalancePosition")}
                </Heading>
                <MassAndBalancePointTable
                    heading={t("aircraft-type.model.massAndBalanceData longCgEnvelopePoints")}
                    massAndBalancePoints={massAndBalanceLongPoints}
                    massAndBalanceDisplayPoints={massAndBalanceLongDisplayPoints}
                    onAdd={handleMbLongAdd}
                    onCheck={toggleMbLongEditMode}
                    onDelete={handleMbLongDelete}
                    onChange={handleMbLongChange}
                />
                <MassAndBalancePointTable
                    heading={t("aircraft-type.model.massAndBalanceData latCgEnvelopePoints")}
                    massAndBalancePoints={massAndBalanceLatPoints}
                    massAndBalanceDisplayPoints={massAndBalanceLatDisplayPoints}
                    onAdd={handleMbLatAdd}
                    onCheck={toggleMbLatEditMode}
                    onDelete={handleMbLatDelete}
                    onChange={handleMbLatChange}
                />
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {t("aircraft-type.aircraftResources")}
                </Heading>
                <AircraftResourceTable
                    aircraftResources={aircraftResources}
                    aircraftResourcesDisplayValues={aircraftResourcesDisplayValues}
                    onAdd={handleArAdd}
                    onCheck={toggleArEditMode}
                    onDelete={handleArDelete}
                    onChange={handleArChange}
                />
            </FormProvider>
        </Box>
    );
};
