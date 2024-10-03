import {
    Button,
    ButtonGroup,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Select,
    Tag,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { Aircraft } from "@voloiq-typescript-api/fti-types";
import { Dispatch, SetStateAction } from "react";
import { AircraftWithStatus } from "../../libs/fti-api/apiModels";
import { getStatusVariant } from "../preview/aircraft-section/AircraftCard";
import { useFtiEditTranslation } from "./translations/useFtiEditTranslation";
import { AircraftOptionType } from "./useAssignAircrafts";

export type AssignedAircraftsProps = {
    isEditModeEnabled: boolean;
    setIsEditModeEnabled: Dispatch<SetStateAction<boolean>>;
    assignedAircrafts: AircraftWithStatus[];
    onAircraftUpdate: (aircraft: AircraftOptionType) => void;
    onAssignAircraft: () => void;
    availableAircrafts: Aircraft[];
};

export const AssignedAircrafts = (props: AssignedAircraftsProps) => {
    const {
        isEditModeEnabled,
        setIsEditModeEnabled,
        assignedAircrafts,
        onAircraftUpdate,
        onAssignAircraft,
        availableAircrafts,
    } = props;

    const { t } = useFtiEditTranslation();

    return (
        <VStack width="100%">
            <HStack justifyContent="space-between" width="100%">
                <Text fontSize="sm" lineHeight={6} fontWeight="semibold">
                    {t("availabilityInAircraft")}
                </Text>
                <Button
                    isDisabled={isEditModeEnabled}
                    onClick={() => setIsEditModeEnabled(true)}
                    leftIcon={<Icon icon="add" size={3.5} />}
                    size="sm"
                >
                    {t("addAircraft")}
                </Button>
            </HStack>
            <Divider orientation="horizontal" mt={2} mb={4.5} />
            <VStack width="100%">
                {assignedAircrafts &&
                    assignedAircrafts.length > 0 &&
                    assignedAircrafts.map((aircraft) => (
                        <HStack
                            bg="bgNavigationLayer1"
                            gap={2}
                            alignItems="flex-start"
                            justifyContent="space-between"
                            key={aircraft.id}
                            width="100%"
                            p={1.5}
                            borderRadius="sm"
                        >
                            <Text fontSize="xs" lineHeight="1.5" fontWeight="semibold">
                                {`${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`}
                            </Text>
                            <Tag colorScheme={getStatusVariant(aircraft?.status)}>
                                <Tag.Label>{t(`status.${aircraft?.status}`)}</Tag.Label>
                            </Tag>
                        </HStack>
                    ))}
            </VStack>
            {isEditModeEnabled && (
                <VStack width="100%">
                    <Grid width="100%" templateColumns="repeat(4,1fr)">
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel>{t("aircraft")}</FormLabel>
                                <Select
                                    options={availableAircrafts.map((aircraft) => ({
                                        label: `${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`,
                                        value: aircraft.id,
                                    }))}
                                    onChange={(aircraft) => aircraft && onAircraftUpdate(aircraft)}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem alignSelf="flex-end" justifySelf="flex-end" colStart={4}>
                            <ButtonGroup>
                                <IconButton
                                    variant="ghost"
                                    aria-label={t("closeButton")}
                                    onClick={() => setIsEditModeEnabled(false)}
                                >
                                    <Icon icon="close" size={4} />
                                </IconButton>
                                <IconButton onClick={onAssignAircraft} aria-label={t("checkButton")} variant="ghost">
                                    <Icon icon="check" size={4} />
                                </IconButton>
                            </ButtonGroup>
                        </GridItem>
                    </Grid>
                </VStack>
            )}
        </VStack>
    );
};
