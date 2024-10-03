import { Box, Checkbox, Heading } from "@volocopter/design-library-react";
import type { AircraftCreate as AircraftCreateObject, Service } from "@voloiq-typescript-api/aircraft-management-types";
import { TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import type { SelectOption } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { AircraftResourceTable } from "../../aircraft-type/AircraftResourceTable";
import { MassAndBalanceDataTable } from "../../aircraft-type/MassAndBalanceDataTable";
import { MassAndBalancePointTable } from "../../aircraft-type/MassAndBalancePointTable";
import { useCreateAircraft } from "../../api-hooks/useAircraftService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useToggle } from "../hooks/useToggle";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";
import { useGetAirCraftValidToDate } from "../utils/GetAirCraftValidToDate";
import { useAircraftCreateForm } from "./useAircraftCreateForm";

type AircraftCreateProps = RenderAddHandlerProps;
export const AircraftCreate = (props: AircraftCreateProps) => {
    const { formRef, onSubmitError, onSubmit, onAfterSubmit } = props;
    const { t: resourceTranslation } = useResourcesTranslation();
    const { t: aircraftTranslation } = useAircraftTranslation();
    const {
        FormControl,
        createAircraftSchema,
        isCreateAircraftFieldName,
        selectAircraftType,
        selectedAircraftType,
        aircraftResources,
        massAndBalanceLongPoints,
        massAndBalanceLatPoints,
        massAndBalanceData,
        resetAircraftTypeState,
    } = useAircraftCreateForm();

    const { getValidToDate } = useGetAirCraftValidToDate();

    const { sendRequest } = useCreateAircraft();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: createAircraftSchema,
        isFieldName: isCreateAircraftFieldName,
    });
    const { isToggled, setToggle } = useToggle();
    const validFrom = new Date();
    validFrom.setHours(validFrom.getUTCHours() + 1);
    validFrom.setMinutes(validFrom.getMinutes());
    validFrom.setSeconds(0);
    validFrom.setMilliseconds(0);

    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                formId="aircraftCreateForm"
                schema={createAircraftSchema}
                formType="create"
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                initialValues={{
                    validFrom,
                    technicalStatus: {
                        value: TechnicalStatus.SERVICEABLE,
                        label: aircraftTranslation("model.technicalStatus serviceable"),
                    },
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onCreate={async (formData) => {
                    try {
                        const data: AircraftCreateObject = {
                            registration: formData.registration,
                            msn: formData.msn,
                            services: formData.services.map((service: SelectOption) => service.value as Service),
                            aircraftTypeId: formData.aircraftType.value,
                            technicalStatus: formData.technicalStatus.value,
                            homebaseVertiportId: formData.homebaseVertiport?.value,
                            crewConfiguration: formData.crewConfiguration.value,
                            validFrom: formData.validFrom ? formData.validFrom.toISOString() : "",
                            validTo: formData.validTo
                                ? formData.validTo.toISOString()
                                : getValidToDate(formData.aircraftType.value, formData.homebaseVertiport?.value),
                            massAndBalanceData: {
                                ...massAndBalanceData.values,
                                longCgEnvelopePoints: massAndBalanceLongPoints.values,
                                latCgEnvelopePoints: massAndBalanceLatPoints.values,
                            },
                            aircraftResources: aircraftResources.values,
                        };
                        const hasError = await makeRequestWithErrorHandling(data);
                        if (!hasError) onSubmit();
                    } catch {
                        onSubmitError("GENERIC");
                    }
                }}
            >
                <FormControl
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.msn")}
                    fieldName="msn"
                />
                <FormControl
                    fieldName="aircraftType"
                    onChange={(data) => {
                        selectAircraftType(data as SelectOption);
                        resetAircraftTypeState();
                        setToggle(false);
                    }}
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.aircraftType")}
                />
                <FormControl
                    fieldName="registration"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.aircraftRegistration")}
                />
                <FormControl
                    fieldName="services"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.services")}
                />
                <FormControl
                    fieldName="validFrom"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.validFrom")}
                />
                <FormControl
                    fieldName="validTo"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.validTo")}
                />
                <FormControl
                    fieldName="technicalStatus"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.technicalStatus")}
                />
                <FormControl
                    fieldName="homebaseVertiport"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.homebase")}
                />
                <FormControl
                    fieldName="crewConfiguration"
                    additionalInfo={resourceTranslation("aircraft-management.additionalInfo.crewConfiguration")}
                />
                {!!selectedAircraftType && (
                    <>
                        <Checkbox
                            isChecked={isToggled}
                            onChange={() => {
                                const newToggleValue = !isToggled;
                                setToggle(newToggleValue);

                                if (!newToggleValue) {
                                    resetAircraftTypeState();
                                }
                            }}
                        >
                            {aircraftTranslation("create.checkbox")}
                        </Checkbox>
                        <Heading as="h3" marginTop="2em" marginBottom="1em">
                            {resourceTranslation("aircraft-type.massAndBalanceData")}
                        </Heading>
                        <MassAndBalanceDataTable
                            massAndBalanceData={massAndBalanceData.values}
                            onChange={massAndBalanceData.handleChange}
                            isDisabled={!isToggled}
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
                            isDisabled={!isToggled}
                        />
                        <MassAndBalancePointTable
                            heading={resourceTranslation("aircraft-type.model.massAndBalanceData latCgEnvelopePoints")}
                            massAndBalancePoints={massAndBalanceLatPoints.values}
                            massAndBalanceDisplayPoints={massAndBalanceLatPoints.displayValues}
                            onAdd={massAndBalanceLatPoints.handleAdd}
                            onCheck={massAndBalanceLatPoints.toggleEditMode}
                            onDelete={massAndBalanceLatPoints.handleDelete}
                            onChange={massAndBalanceLatPoints.handleChange}
                            isDisabled={!isToggled}
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
                            isDisabled={!isToggled}
                        />
                    </>
                )}
            </FormProvider>
        </Box>
    );
};
