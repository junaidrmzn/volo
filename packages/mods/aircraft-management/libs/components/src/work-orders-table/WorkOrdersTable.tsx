import { Box, HStack, SimpleGrid, Text, VStack } from "@volocopter/design-library-react";
import { WorkOrder } from "@voloiq/aircraft-management-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { ColumnText } from "./ColumnText";
import { HeaderText } from "./HeaderText";
import { useWorkOrdersTableTranslations } from "./translations/useWorkOrdersTableTranslations";

type WorkOrdersTableProps = {
    workOrders: WorkOrder[];
};

export const WorkOrdersTable = (props: WorkOrdersTableProps) => {
    const { workOrders } = props;
    const { t } = useWorkOrdersTableTranslations();
    const { formatDateTime } = useFormatDateTime();

    const DividerWithoutMargin = () => <Box width="full" borderBottom="1px" borderBottomColor="darkBlue.200" />;
    return (
        <VStack width="full" divider={<DividerWithoutMargin />} py="0">
            <SimpleGrid columns={9} width="full" alignItems="flex-start" gridAutoFlow="column" px="3" py="2">
                <HeaderText>{t("state")}</HeaderText>
                <HeaderText>{t("dueDate")}</HeaderText>
                <HeaderText>{t("workOrderPackageName")}</HeaderText>
                <HeaderText>{t("defectClassification")}</HeaderText>
                <HeaderText>{t("issueSign")}</HeaderText>
                <HeaderText>{t("ataChapterNumber")}</HeaderText>
                <HeaderText>{t("aogClassification")}</HeaderText>
                <HeaderText>{t("priority")}</HeaderText>
                <HeaderText>{t("workStepsTitle")}</HeaderText>
            </SimpleGrid>
            {workOrders.map((workOrder) => (
                <SimpleGrid
                    columns={9}
                    width="full"
                    alignItems="flex-start"
                    gridAutoFlow="column"
                    key={`workOrder-${workOrder.number}`}
                    px="3"
                    py="2"
                >
                    <ColumnText>{workOrder.state}</ColumnText>
                    <ColumnText>{workOrder.dueDate ? formatDateTime(workOrder.dueDate) : "-"}</ColumnText>
                    <ColumnText>{workOrder.packageName}</ColumnText>
                    <ColumnText>{workOrder.defectClassification}</ColumnText>
                    <ColumnText>{workOrder.issueSign}</ColumnText>
                    <ColumnText>{workOrder.ataChapterNumber}</ColumnText>
                    <ColumnText>{workOrder.aogClassification}</ColumnText>
                    <ColumnText>{workOrder.priority}</ColumnText>
                    <ColumnText>
                        {workOrder.workSteps
                            ? workOrder.workSteps.map((workStep) => {
                                  return (
                                      <HStack key={workStep.sequence}>
                                          <Text fontSize="xxs" lineHeight={4} color="fontOnBgAction">
                                              &#9679;
                                          </Text>
                                          <Text fontSize="xxs" lineHeight={4} color="fontOnBgAction">
                                              {workStep.description}
                                          </Text>
                                      </HStack>
                                  );
                              })
                            : "-"}
                    </ColumnText>
                </SimpleGrid>
            ))}
        </VStack>
    );
};
