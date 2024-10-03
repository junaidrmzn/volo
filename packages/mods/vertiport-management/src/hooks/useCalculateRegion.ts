import { useEffect, useState } from "react";
import type { ErrorOption } from "react-hook-form";
import type { Point, Region } from "@voloiq/vertiport-management-api/v1";
import { useGetRegionWithCoordinates } from "../api-hooks/useRegionService";

export type useCalculateRegionProps = {
    initialCoordinate: Point;
    setValue: (name: string, value: unknown) => void;
    regions: Region[];
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
    selectedRegion?: { label: string | undefined; value: string | undefined };
};

export const countDecimals = (number_: number) => {
    if (Math.floor(number_.valueOf()) === number_.valueOf()) return 0;
    return number_.toString().split(".")[1]?.length || 0;
};

export const useCalculateRegion = (props: useCalculateRegionProps) => {
    const { initialCoordinate, setValue, regions, setError, clearError, selectedRegion } = props;
    const [coordinate, setCoordinate] = useState<Point>(initialCoordinate || { latitude: 0, longitude: 0, height: 0 });
    const [init, setInit] = useState<boolean>(true);
    const [calculatedRegion, setCalculatedRegion] = useState<{ label: string | undefined; value: string | undefined }>({
        label: "",
        value: "",
    });
    const { data: regionId, state } = useGetRegionWithCoordinates(coordinate.latitude, coordinate.longitude);
    useEffect(() => {
        if (state === "success") {
            setValue("regionId", {
                label: regions.find((it) => it.id === regionId.toString())?.name ?? undefined,
                value: regions.find((it) => it.id === regionId.toString())?.id ?? undefined,
            });
            setCalculatedRegion({
                label: regions.find((it) => it.id === regionId.toString())?.name ?? "",
                value: regions.find((it) => it.id === regionId.toString())?.id ?? "",
            });
            clearError("regionId");
            setInit(false);
        }
        if (state === "error") {
            if (selectedRegion) {
                setCalculatedRegion(selectedRegion);
                setValue("regionId", selectedRegion);
            } else {
                setCalculatedRegion({
                    label: "",
                    value: "",
                });
                setValue("regionId", {
                    label: undefined,
                    value: undefined,
                });
            }
            if (!init) setError("regionId", { type: "required", message: "Please choose valid option" });
        }
    }, [coordinate, regionId, init, regions, setValue, state, clearError, setError, selectedRegion]);

    return { coordinate, setCoordinate, init, setInit, regionId, calculatedRegion, setCalculatedRegion };
};
