import { CoordinateInput } from "@volocopter/coordinate-input-react";
import { Box, Button, Icon } from "@volocopter/design-library-react";
import { useEffect, useMemo } from "react";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { Table } from "@voloiq/table";
import type { Point, Region, RegionUpdate } from "@voloiq/vertiport-management-api/v1";
import { useUpdateRegion } from "../../api-hooks/useRegionService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useCoordinates } from "../../hooks/useCoordinates";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { getPolygonCentroid } from "../getPolygonCentroid";
import { EditRegionFormFields } from "./EditRegionFormFields";
import { useRegionEditForm } from "./useRegionEditForm";

type RegionEditProps = RenderEditHandlerProps<Region>;
export const EditRegion = (props: RegionEditProps) => {
    const { formRef, resource, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { id: regionId } = resource;
    const { t } = useVertiportTranslation();
    const { regionInitialValues, editRegionSchema, isRegionFieldName, version } = useRegionEditForm(resource);
    const { sendRequestById } = useUpdateRegion();
    const { coordinates, setCoordinates, init, setInit } = useCoordinates();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: RegionUpdate }) =>
            sendRequestById(regionId || "-1", { ...requestConfig, params: { version } }),
        schema: editRegionSchema,
        isFieldName: isRegionFieldName,
    });

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    useEffect(() => {
        setCoordinates(regionInitialValues.coordinates);
    }, [regionInitialValues.coordinates, setCoordinates]);

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const columns = useMemo(
        () => [
            {
                Header: "Coordinates",
                accessor: "coordinates",
                id: "coordinates",
            },
            {
                Header: (
                    <div>
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
                    </div>
                ),
                accessor: (data: { edit: number }) => data.edit,
                id: "edit",
            },
        ],
        [coordinates, setCoordinates]
    );

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const data = useMemo(
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
                                const [latitude, longitude] = value.split(",").map((coordinate) => coordinate.trim());
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
    );

    return (
        <Box background="mono500Gray750" borderRadius="md" padding={4}>
            <FormProvider
                formId="regionEditForm"
                schema={editRegionSchema}
                formType="edit"
                formRef={formRef}
                initialValues={regionInitialValues}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                onEdit={async (regionFormData) => {
                    try {
                        if (getPolygonCentroid(coordinates)) {
                            onSubmit();
                            const data: RegionUpdate = {
                                id: regionId,
                                name: regionFormData.name,
                                coordinates: { points: coordinates },
                                center: getPolygonCentroid(coordinates) || { latitude: 0, longitude: 0, height: 0 },
                                validFrom: regionFormData.validFrom ? regionFormData.validFrom.toISOString() : "",
                                validTo: regionFormData.validTo ? regionFormData.validTo.toISOString() : "",
                                publicFrom: regionFormData.publicFrom ? regionFormData.publicFrom.toISOString() : "",
                                publicTo: regionFormData.publicTo ? regionFormData.publicTo.toISOString() : "",
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
                <EditRegionFormFields region={resource} />
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
                    <Table columns={columns} data={data} />
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
