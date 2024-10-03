import { Button, HStack, Icon, Input, NumberInput, Select, VStack } from "@volocopter/design-library-react";
import { WeightUnitInput, WeightValueWithUnit } from "@volocopter/unit-inputs-react";
import type { AircraftResource } from "@voloiq-typescript-api/aircraft-management-types";
import { AircraftResourceType } from "@voloiq-typescript-api/aircraft-management-types";
import type { ChangeEvent } from "react";
import { useCallback, useMemo } from "react";
import { Table } from "@voloiq/table";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { isNumber } from "./utils/number";

type AircraftResourceTableProps = {
    aircraftResources: (AircraftResource & { editMode: boolean })[];
    aircraftResourcesDisplayValues: { weight?: string }[];
    onAdd: () => void;
    onCheck: (index: number) => void;
    onDelete: (index: number) => void;
    onChange: (index: number, aircraftResource: AircraftResource) => void;
    isDisabled?: boolean;
};

export const AircraftResourceTable = (props: AircraftResourceTableProps) => {
    const { aircraftResources, onAdd, onCheck, onDelete, onChange, isDisabled, aircraftResourcesDisplayValues } = props;
    const { t } = useResourcesTranslation();
    const columns = [
        {
            Header: `${t("aircraft-type.model.aircraftResources name")}:*`,
            accessor: "name",
            id: "name",
        },
        {
            Header: `${t("aircraft-type.model.aircraftResources type")}:*`,
            accessor: "type",
            id: "type",
        },
        {
            Header: `${t("aircraft-type.model.aircraftResources positionCoordinates")}:*`,
            accessor: "position",
            id: "position",
        },
        {
            Header: `${t("aircraft-type.model.aircraftResources weight")}:`,
            accessor: "weight",
            id: "weight",
        },
        {
            Header: (
                <HStack justifyContent="flex-end" width="100%">
                    <Button title={t("generic.add button")} onClick={onAdd} isDisabled={isDisabled}>
                        <Icon icon="add" size={6} />
                    </Button>
                </HStack>
            ),
            accessor: "selection",
            id: "selection",
        },
    ];

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const isValidAircraftResource = useCallback(
        (index: number) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const { name, type, position, weight } = aircraftResources[index]!;
            const isEverythingSet = ![name, type, position.x, position.y].includes("");
            const isValidPosition = isNumber(position?.x ?? "") && isNumber(position?.y ?? "");
            const isValidWeight = weight ? isNumber(weight) : true;

            return isEverythingSet && isValidPosition && isValidWeight;
        },
        [aircraftResources]
    );

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const aircraftResourceRows = useMemo(() => {
        const typeOptions = [
            {
                value: AircraftResourceType.PILOT_SEAT,
                label: t("aircraft-type.model.aircraftResources pilotSeat"),
            },
            {
                value: AircraftResourceType.PASSENGER_SEAT,
                label: t("aircraft-type.model.aircraftResources passengerSeat"),
            },
            {
                value: AircraftResourceType.BATTERY_SLOT,
                label: t("aircraft-type.model.aircraftResources batterySlot"),
            },
            {
                value: AircraftResourceType.LUGGAGE_COMPARTMENT,
                label: t("aircraft-type.model.aircraftResources luggageCompartment"),
            },
            {
                value: AircraftResourceType.OTHER,
                label: t("aircraft-type.model.aircraftResources otherResource"),
            },
        ];

        const rows = aircraftResources.map((resource, index) => {
            const isExistingResource = !!resource.id;
            const isExistingPilotSeatOrBatterySlot =
                isExistingResource &&
                [AircraftResourceType.PILOT_SEAT, AircraftResourceType.BATTERY_SLOT].includes(resource.type);

            if (!resource.editMode) {
                return {
                    name: resource.name,
                    type: typeOptions.find((option) => option.value === resource.type)?.label,

                    position: (
                        <VStack alignItems="start">
                            {resource.position?.x !== undefined && <div>{resource.position.x} x</div>}
                            {resource.position?.y !== undefined && <div>{resource.position.y} y</div>}
                        </VStack>
                    ),
                    weight: (
                        <HStack>
                            <WeightValueWithUnit displayUnit="kg" baseUnit="kg" baseValue={resource?.weight ?? 0} />
                        </HStack>
                    ),
                    selection: (
                        <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                            <Button
                                title={t("generic.edit button")}
                                onClick={() => onCheck(index)}
                                isDisabled={isDisabled}
                            >
                                <Icon icon="edit" size={6} />
                            </Button>
                            <Button
                                title={t("generic.delete button")}
                                onClick={() => onDelete(index)}
                                isDisabled={isDisabled || isExistingPilotSeatOrBatterySlot}
                            >
                                <Icon icon="trash" size={6} />
                            </Button>
                        </VStack>
                    ),
                };
            }

            return {
                name: (
                    <div style={{ width: "18vw" }}>
                        <Input
                            value={resource.name}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                onChange(index, { ...resource, name: event.target.value });
                            }}
                            isRequired
                        />
                    </div>
                ),
                type: (
                    <div style={{ width: "18vw" }}>
                        <Select
                            id="Type"
                            name="Type"
                            defaultValue={typeOptions.find((option) => option.value === resource.type)}
                            placeholder={t("generic.dropdown placeholder")}
                            options={typeOptions}
                            onChange={(option) => {
                                if (option) onChange(index, { ...resource, type: option.value });
                            }}
                            isRequired
                            isDisabled={isExistingPilotSeatOrBatterySlot}
                        />
                    </div>
                ),
                position: (
                    <VStack alignItems="start">
                        <NumberInput
                            value={resource.position?.x}
                            onChange={(x) => {
                                const position = { ...resource.position, x: x as unknown as number };
                                onChange(index, { ...resource, position });
                            }}
                            isRequired
                            isDisabled={isExistingResource}
                            placeholder={t("aircraft-type.model.aircraftResources position x")}
                        />
                        <NumberInput
                            value={resource.position?.y}
                            onChange={(y) => {
                                const position = { ...resource.position, y: y as unknown as number };
                                onChange(index, { ...resource, position });
                            }}
                            isRequired
                            isDisabled={isExistingResource}
                            placeholder={t("aircraft-type.model.aircraftResources position y")}
                        />
                    </VStack>
                ),
                weight: (
                    <WeightUnitInput
                        value={aircraftResourcesDisplayValues[index]?.weight}
                        onChange={(weight) => {
                            if (aircraftResourcesDisplayValues[index])
                                aircraftResourcesDisplayValues[index] = { weight };
                        }}
                        displayUnit="kg"
                        baseUnit="kg"
                        defaultBaseValue={resource.weight}
                        onBaseValueChange={(weight) => {
                            const data = { ...resource, weight: weight as unknown as number };
                            onChange(index, data);
                        }}
                    />
                ),
                selection: (
                    <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                        <Button
                            title={t("generic.create button")}
                            onClick={() => onCheck(index)}
                            isDisabled={!isValidAircraftResource(index) || isDisabled}
                        >
                            <Icon icon="check" size={6} />
                        </Button>
                        <Button
                            title={t("generic.delete button")}
                            onClick={() => onDelete(index)}
                            isDisabled={isDisabled || isExistingPilotSeatOrBatterySlot}
                        >
                            <Icon icon="trash" size={6} />
                        </Button>
                    </VStack>
                ),
            };
        });

        const emptyRow = {
            name: <div style={{ height: "15vh" }} />,
            type: null,
            position: null,
            weight: null,
            selection: null,
        };

        return [...rows, emptyRow];
    }, [
        t,
        aircraftResources,
        aircraftResourcesDisplayValues,
        isValidAircraftResource,
        isDisabled,
        onCheck,
        onDelete,
        onChange,
    ]);

    return <Table columns={columns} data={aircraftResourceRows} />;
};
