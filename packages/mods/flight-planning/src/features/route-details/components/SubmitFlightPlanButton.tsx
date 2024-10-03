import { Box, Button, HStack } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { LoadingSpinner } from "../../../components";
import { useFlightPlanningTranslation } from "../../../translations";
import { useSubmitFlightPlanButton } from "../hooks";

type SubmitFlightPlanButtonProps = {
    route: Route;
};

export const SubmitFlightPlanButton = (props: SubmitFlightPlanButtonProps) => {
    const { route } = props;
    const { handleEditFlightMission, isDisabled, isLoading } = useSubmitFlightPlanButton(route);
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <HStack justifyContent="flex-end" m="2">
            <Button
                data-testid="submit-flight-plan-button"
                isDisabled={isDisabled}
                onClick={() => handleEditFlightMission()}
                variant="primary"
            >
                {isLoading ? (
                    <>
                        {translate("routeDetails.flightPlan.submitting")}
                        <Box ml={1}>
                            <LoadingSpinner size="xs" />
                        </Box>
                    </>
                ) : (
                    translate("routeDetails.flightPlan.submit")
                )}
            </Button>
        </HStack>
    );
};
