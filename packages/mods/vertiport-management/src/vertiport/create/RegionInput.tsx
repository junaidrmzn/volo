import { CoordinateInput } from "@volocopter/coordinate-input-react";
import { FormControl, FormErrorMessage, FormLabel, Select } from "@volocopter/design-library-react";
import type { ErrorOption, FieldError } from "react-hook-form";
import { Region } from "@voloiq/vertiport-management-api/v1";
import { useCalculateRegion } from "../../hooks/useCalculateRegion";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { formatCoordinate } from "../../utils";

type FieldState = {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    error?: FieldError | undefined;
};

export type RegionInputProps = {
    regions: Region[];
    setValue: (name: string, value: unknown) => void;
    getFieldState: (name: string) => FieldState;
    clearError: (name: string) => void;
    setError: (
        name: string,
        error: ErrorOption,
        options?:
            | {
                  shouldFocus: boolean;
              }
            | undefined
    ) => void;
    getValue(name: string): number | string;
    selectedRegion?: { label: string | undefined; value: string | undefined };
};

export const RegionInput = (props: RegionInputProps) => {
    const { regions, setValue, getFieldState, clearError, setError, getValue, selectedRegion } = props;
    const { t } = useVertiportTranslation();
    const coordinatesValue = getValue("coordinates")
        ? getValue("coordinates")
              .toString()
              .split(",")
              .map((value) => value.trim())
        : [0, 0];

    const { coordinate, setCoordinate, calculatedRegion, setCalculatedRegion } = useCalculateRegion({
        initialCoordinate: {
            latitude: coordinatesValue[0] ? Number(coordinatesValue[0]) : 0,
            longitude: coordinatesValue[1] ? Number(coordinatesValue[1]) : 0,
            height: 0,
        },
        setValue,
        regions,
        clearError,
        setError,
        selectedRegion,
    });

    return (
        <>
            <FormControl isInvalid={getFieldState("coordinates").invalid}>
                <FormLabel additionalInfo={t("vertiport.additionalInfo.coordinates")}>Coordinates:*</FormLabel>
                <CoordinateInput
                    value={`${coordinate.latitude}, ${coordinate.longitude}`}
                    name="coordinates"
                    isInvalid={getFieldState("coordinates").invalid}
                    coordinateInfoLabels={{
                        latitudeLabel: t("fatoStand.model.latitude"),
                        longitudeLabel: t("fatoStand.model.longitude"),
                        cancelButtonLabel: t("buttons.cancel"),
                        applyButtonLabel: t("buttons.apply"),
                        iconButtonLabel: t("fatoStand.model.coordinates"),
                    }}
                    onChange={(event: Event) => {
                        const { value } = event.target as HTMLInputElement;
                        if (value === "") {
                            setError("coordinates", { type: "required", message: t("generic.required error") });
                        }
                        setValue("coordinates", value);
                        clearError("coordinates");
                        setCoordinate(formatCoordinate(value));
                    }}
                    onBlur={() => {
                        const value = getValue("coordinates");
                        if (value === "") {
                            setError("coordinates", { type: "required", message: t("generic.required error") });
                        }
                        clearError("coordinates");
                        setCoordinate(formatCoordinate(value.toString()));
                    }}
                />
                <FormErrorMessage>{getFieldState("coordinates").error?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={getFieldState("regionId").invalid}>
                <FormLabel additionalInfo={t("vertiport.additionalInfo.region")}>Region:*</FormLabel>
                <Select
                    name="regionId"
                    id="selectedRegion"
                    value={calculatedRegion}
                    placeholder="Please choose"
                    onChange={(option) => {
                        setCalculatedRegion({ label: option?.label ?? undefined, value: option?.value ?? undefined });
                        setValue("regionId", { label: option?.label ?? undefined, value: option?.value ?? undefined });
                        if (option?.value !== "") clearError("regionId");
                    }}
                    options={regions.map((region) => ({ label: region.name, value: region.id }))}
                />
                <FormErrorMessage>{getFieldState("regionId").error?.message}</FormErrorMessage>
            </FormControl>
        </>
    );
};
