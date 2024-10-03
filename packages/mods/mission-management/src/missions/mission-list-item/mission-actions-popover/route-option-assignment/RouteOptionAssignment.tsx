import { Box, Button, Flex, Icon, RadioGroup, Text } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useGetAllVertiports } from "../../../../api-hooks/useNetworkSchedulingService";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { RouteOptionCard } from "./RouteOptionCard";
import { useMissionRouteOptionAssignment } from "./useMissionRouteOptionAssignment";

type RouteOptionAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const RouteOptionAssignment = (props: RouteOptionAssignmentProps) => {
    const { mission, onReloadList } = props;
    const { t } = useMissionTranslations();
    const { data: vertiports } = useGetAllVertiports();

    const { onSubmit, routeOptions, setSelectedRouteOption, selectedRouteOption } = useMissionRouteOptionAssignment({
        mission,
        onReloadList,
    });

    return (
        <>
            <Box bg="monochrome.200" p={3} borderRadius="sm">
                <RadioGroup
                    onChange={(value) => {
                        setSelectedRouteOption(value);
                    }}
                    value={selectedRouteOption}
                >
                    {routeOptions.length > 0 ? (
                        <Box overflowY="scroll" maxH="50vh">
                            {routeOptions.map((routeOption) => (
                                <RouteOptionCard
                                    key={routeOption.id}
                                    routeOption={routeOption}
                                    vertiports={vertiports}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Text align="center">{t("routeOption error")}</Text>
                    )}
                </RadioGroup>
            </Box>
            <Flex justifyContent="flex-end" mt={4}>
                <Button
                    type="submit"
                    leftIcon={<Icon icon="check" size={4} />}
                    size="lg"
                    variant="primary"
                    isDisabled={selectedRouteOption === ""}
                    onClick={onSubmit}
                >
                    {t("buttons.assign")}
                </Button>
            </Flex>
        </>
    );
};
