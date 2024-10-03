import { Box, Card, Flex, Spinner, Text, VStack } from "@volocopter/design-library-react";
import { useGetWorkOrders } from "@voloiq/aircraft-management-api/v1";
import { WorkOrdersTable } from "@voloiq/aircraft-management-components";
import { useErrorToastWithDescription } from "../hooks/useErrorToast";
import { useWorkOrdersTranslation } from "./translations/useWorkOrdersTranslation";

type WorkOrdersProps = {
    aircraftId: string;
};

export const WorkOrders = (props: WorkOrdersProps) => {
    const { aircraftId } = props;
    const { data: workOrders, state } = useGetWorkOrders({ aircraftId, manual: false });
    const { onError } = useErrorToastWithDescription();
    const { t } = useWorkOrdersTranslation();

    return (
        <Box width="100%" backgroundColor="bgNavigationLayer1" borderRadius="md">
            <VStack spacing={1.5} alignItems="flex-start" p={3}>
                <Flex width="100%" mb={1}>
                    <VStack spacing={0} alignItems="flex-start" width="100%">
                        <Text fontWeight="light">{t("workOrders")}</Text>
                    </VStack>
                </Flex>
                {state === "success" && workOrders ? (
                    <VStack width="100%" alignItems="flex-start">
                        <Card width="100%" p={3}>
                            <WorkOrdersTable workOrders={workOrders} />
                        </Card>
                    </VStack>
                ) : state === "pending" || state === "idle" ? (
                    <VStack my={6} justifyContent="center" alignItems="center" width="100%">
                        <Spinner />
                    </VStack>
                ) : (
                    <>{onError(t("error.An error occurred"))}</>
                )}
            </VStack>
        </Box>
    );
};
