import { Box, Button, Container, HStack, Header, HeaderLayout, Text } from "@volocopter/design-library-react";
import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { format } from "date-fns";
import type { SelectOption } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { useNavigate, useParams } from "@voloiq/routing";
import { useCreateFlightPlan } from "../../api-hooks";
import { ErrorPage, LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";
import { useFileFlightPlan } from "./useFileFlightPlan";

export const FileFlightPlan = () => {
    const { t } = useFlightPlanningTranslation();
    const { routeOptionId } = useParams();
    const navigate = useNavigate();

    const { createFlightPlan, isLoading, isSuccess } = useCreateFlightPlan(routeOptionId!);
    const { FormControl, createFlightParametersSchema, setPreferredRouteId, routesQuery, utmProvidersQuery } =
        useFileFlightPlan(isSuccess);

    if (routesQuery.isError || utmProvidersQuery.isError) {
        return <ErrorPage error={routesQuery.isError ? routesQuery.error.message : utmProvidersQuery.error!.message} />;
    }

    if (routesQuery.isLoading || utmProvidersQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    title={t("flight.fileFlightPlan.title")}
                    hasReturnMarker
                    onClick={() => navigate(`../route-options/${routeOptionId}`)}
                    returnMarkerAriaLabel={t("common.back")}
                />
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                <Container>
                    <FormProvider
                        formId="fileFlightPlan"
                        schema={createFlightParametersSchema}
                        formType="create"
                        initialValues={{
                            // scheduledDepartureTime: new Date(flightPlan.scheduledDepartureTime),
                            // scheduledArrivalTime: new Date(flightPlan.scheduledArrivalTime),
                            flightRules: { value: "VFR" },
                            operationType: { value: "other" },
                            paxCount: 1,
                        }}
                        onCreate={(formData) => {
                            const data: FlightPlanInfo = {
                                operationType: formData.operationType.value,
                                flightRules: formData.flightRules.value,
                                paxCount: formData.paxCount,
                                additionalRoutes: formData.additionalRoutes?.map((selectedOption) =>
                                    Number.parseInt(selectedOption.value, 10)
                                ),
                                preferredRoute: Number.parseInt(formData.preferredRoute.value, 10),
                                scheduledArrivalTime: format(formData.scheduledArrivalTime, "yyyy-MM-dd HH:mm"),
                                scheduledDepartureTime: format(formData.scheduledDepartureTime, "yyyy-MM-dd HH:mm"),
                                serviceProvider: Number.parseInt(formData.utmProvider.value, 10),
                                aircraftId: formData.aircraftId.value,
                            };
                            createFlightPlan(data);
                        }}
                    >
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl fieldName="scheduledDepartureTime" />
                            <FormControl fieldName="scheduledArrivalTime" />
                        </HStack>
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl fieldName="operationType" />
                            <FormControl fieldName="flightRules" />
                        </HStack>
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl fieldName="aircraftId" />
                        </HStack>
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl fieldName="paxCount" />
                        </HStack>
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl
                                fieldName="preferredRoute"
                                onChange={(data) => {
                                    const selectData = data as SelectOption<string>;
                                    setPreferredRouteId(Number.parseInt(selectData.value, 10));
                                }}
                            />
                        </HStack>
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl fieldName="additionalRoutes" />
                        </HStack>
                        <HStack width="100%" marginTop={4} alignItems="flex-start">
                            <FormControl fieldName="utmProvider" />
                        </HStack>
                        <HStack width="100%" pt={8} alignItems="flex-start">
                            <Button width="100%" form="fileFlightPlan" variant="primary" type="submit">
                                {t("flight.fileFlightPlan.submitFlightPlan")}
                            </Button>
                        </HStack>
                        {isLoading && (
                            <HStack justifyContent="space-between" p={0}>
                                <Box width="10">
                                    <LoadingSpinner size="xs" />
                                </Box>
                                <Text>{t("flight.fileFlightPlan.sendingFlightPlan")}</Text>
                            </HStack>
                        )}
                    </FormProvider>
                </Container>
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
