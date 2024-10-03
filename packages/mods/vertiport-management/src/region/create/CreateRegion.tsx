import { CoordinateInput } from "@volocopter/coordinate-input-react";
import { Box, Button, Icon } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { Table } from "@voloiq/table";
import type { Point, RegionCreate } from "@voloiq/vertiport-management-api/v1";
import { useCreateRegion } from "../../api-hooks/useRegionService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useCoordinates } from "../../hooks/useCoordinates";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { getPolygonCentroid } from "../getPolygonCentroid";
import { useRegionCreateForm } from "./useCreateRegionForm";

type RegionCreateProps = RenderAddHandlerProps;
export const CreateRegion = (props: RegionCreateProps) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { t } = useVertiportTranslation();
    const { FormControl, createRegionSchema, isCreateRegionFieldName } = useRegionCreateForm();
    const { sendRequest } = useCreateRegion();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: createRegionSchema,
        isFieldName: isCreateRegionFieldName,
    });
    const { coordinates, setCoordinates, init, setInit } = useCoordinates([
        { latitude: 0, longitude: 0, height: 0 },
        { latitude: 0, longitude: 0, height: 0 },
        { latitude: 0, longitude: 0, height: 0 },
    ]);

    return (
        <Box background="mono500Gray750" borderRadius="md" padding={4}>
            <FormProvider
                formId="regionCreateForm"
                schema={createRegionSchema}
                formType="create"
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                initialValues={{ validFrom: new Date() }}
                onCreate={async (regionFormData) => {
                    try {
                        if (getPolygonCentroid(coordinates)) {
                            onSubmit();
                            const data: RegionCreate = {
                                name: regionFormData.name,
                                validFrom: regionFormData.validFrom.toISOString(),
                                validTo: regionFormData.validTo ? regionFormData.validTo.toISOString() : undefined,
                                publicFrom: regionFormData.publicFrom
                                    ? regionFormData.publicFrom.toISOString()
                                    : undefined,
                                publicTo: regionFormData.publicTo ? regionFormData.publicTo.toISOString() : undefined,
                                coordinates: { points: coordinates },
                                center: getPolygonCentroid(coordinates) || { latitude: 0, longitude: 0, height: 0 },
                            };
                            return await makeRequestWithErrorHandling(data);
                        }
                        setInit(false);
                        return {};
                    } catch {
                        onSubmitError("GENERIC");
                        return {};
                    }
                }}
            >
                <FormControl fieldName="name" additionalInfo={t("region.additionalInfo.name")} />
                <FormControl fieldName="validFrom" additionalInfo={t("region.additionalInfo.validFrom")} />
                <FormControl fieldName="validTo" additionalInfo={t("region.additionalInfo.validTo")} />
                <FormControl fieldName="publicFrom" additionalInfo={t("region.additionalInfo.publicFrom")} />
                <FormControl fieldName="publicTo" additionalInfo={t("region.additionalInfo.publicTo")} />
                <Box
                    display="flex-grow"
                    flexDirection="row"
                    width="100%"
                    padding={1}
                    backgroundColor={
                        init ? "-moz-initial" : getPolygonCentroid(coordinates) && !init ? "-moz-initial" : "red.500"
                    }
                    borderRadius={10}
                >
                    <Table
                        // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
                        columns={useMemo(
                            () => [
                                {
                                    Header: "Coordinates",
                                    accessor: "coordinates",
                                    id: "coordinates",
                                },
                                {
                                    Header: (
                                        <>
                                            <Button
                                                marginRight={2}
                                                onClick={() => {
                                                    const newCoordinates: Point[] = [...coordinates];
                                                    newCoordinates.push({ latitude: 0, longitude: 0, height: 0 });
                                                    setCoordinates(newCoordinates);
                                                }}
                                            >
                                                <Icon icon="add" size={6} />
                                            </Button>
                                            <Button
                                                isDisabled={coordinates.length <= 3}
                                                onClick={() => {
                                                    const newCoordinates: Point[] = [...coordinates];
                                                    newCoordinates.pop();
                                                    setCoordinates(newCoordinates);
                                                }}
                                            >
                                                <Icon icon="trash" size={6} />
                                            </Button>
                                        </>
                                    ),
                                    accessor: (data: { edit: number }) => data.edit,
                                    id: "edit",
                                },
                            ],
                            [coordinates, setCoordinates]
                        )}
                        // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
                        data={useMemo(
                            () =>
                                coordinates.map((location) => {
                                    return {
                                        coordinates: (
                                            <CoordinateInput
                                                width="100%"
                                                value={`${location.latitude}, ${location.longitude}`}
                                                name="coordinates"
                                                coordinateInfoLabels={{
                                                    latitudeLabel: t("fatoStand.model.latitude"),
                                                    longitudeLabel: t("fatoStand.model.longitude"),
                                                    cancelButtonLabel: t("buttons.cancel"),
                                                    applyButtonLabel: t("buttons.apply"),
                                                    iconButtonLabel: t("fatoStand.model.coordinates"),
                                                }}
                                                onChange={(event: Event) => {
                                                    const { value } = event.target as HTMLInputElement;
                                                    const [latitude, longitude] = value
                                                        .split(",")
                                                        .map((coordinate) => coordinate.trim());
                                                    const index = coordinates.indexOf(location);
                                                    const newCoordinates: Point[] = [...coordinates];
                                                    newCoordinates[index]!!.longitude = Number(longitude) ?? 0;
                                                    newCoordinates[index]!!.latitude = Number(latitude) ?? 0;
                                                    setCoordinates(newCoordinates);
                                                }}
                                            />
                                        ),
                                        edit: null,
                                    };
                                }),
                            [coordinates, setCoordinates, t]
                        )}
                    />
                </Box>
                {init ? null : getPolygonCentroid(coordinates) && !init ? null : (
                    <Box textColor="red.500" textAlign="center">
                        <p>Coordinates have to result into a Polygone</p>
                    </Box>
                )}
            </FormProvider>
        </Box>
    );
};
