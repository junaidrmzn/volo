/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    Box,
    Button,
    Center,
    Divider,
    HStack,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    VStack,
} from "@volocopter/design-library-react";
import type { BatteryUpdate, Esu } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate, useParams } from "@voloiq/routing";
import { Table } from "@voloiq/table";
import { useGetAssignableEsus, useGetAssignedEsus, useUpdateBattery } from "../../api-hooks/useBatteryService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import type { EsuListItem } from "./EsuListItem";
import { useBatteryEditForm } from "./useBatteryEditForm";
import { useDetermineBatteryEsuTagColor } from "./useDetermineBatteryEsuTagColor";
import { useEsuTable } from "./useEsuTable";
import { useHandleEsuAssign } from "./useHandleEsuAssign";
import { useHandleEsuUnassign } from "./useHandleEsuUnassign";

export const EditBattery = () => {
    const { sendRequestById } = useUpdateBattery();
    const { onError } = useErrorToast();
    const { batteryId } = useParams();
    const { FormControl, batteryInitialValues, editBatterySchema, batteryGetState, refetchData } = useBatteryEditForm(
        batteryId || "-1"
    );
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { onSuccess } = useSuccessToast(false);
    const { esuTableProps } = useEsuTable();
    const { data: assignedEsus, sendRequest: getAssignedEsus } = useGetAssignedEsus(batteryId!);
    const { data: assignableEsus, sendRequest: getAssignableEsus } = useGetAssignableEsus(batteryId!);
    const { handleEsuUnassign, selectedIdsToUnassign } = useHandleEsuUnassign(
        batteryId,
        getAssignableEsus,
        getAssignedEsus,
        refetchData
    );
    const { handleEsuAssign, selectedIdsToAssign } = useHandleEsuAssign(
        batteryId,
        getAssignedEsus,
        getAssignableEsus,
        refetchData
    );
    const { esuColor } = useDetermineBatteryEsuTagColor(assignedEsus, batteryInitialValues.nrEsu);
    const allEsusAssigned = assignableEsus.length === 0;
    const allEsusUnassigned = assignedEsus.length === 0;

    return (
        <ResourceCreateLayout
            formName="batteryEditForm"
            title={`${t("battery.edit.heading")}: ${batteryInitialValues.name}`}
            addButtonLabel={t("battery.edit.update")}
        >
            {batteryGetState === "error" || (!batteryInitialValues && <Box>Error occurred</Box>)}
            <Tabs>
                <TabList>
                    <Tab>{t("battery.edit.generalTab")}</Tab>
                    <Tab>{t("battery.edit.assignEsuTab")}</Tab>
                    <Tab>{t("battery.edit.unassignEsuTab")}</Tab>
                </TabList>
                <TabPanels>
                    {batteryGetState === "pending" && (
                        <Center>
                            <Spinner />
                        </Center>
                    )}
                    {batteryGetState === "success" && (
                        <TabPanel width="fit-content">
                            <FormProvider
                                formId="batteryEditForm"
                                schema={editBatterySchema}
                                formType="edit"
                                initialValues={batteryInitialValues}
                                onEdit={(batteryFormData) => {
                                    const data: BatteryUpdate = {
                                        id: batteryId!,
                                        name: batteryFormData.name,
                                        validFrom: batteryFormData.validFrom
                                            ? batteryFormData.validFrom.toISOString()
                                            : "",
                                        validTo: batteryFormData.validTo ? batteryFormData.validTo.toISOString() : "",
                                        actStatus: batteryFormData.actStatus.value,
                                        flightPermits: batteryFormData.flightPermits.value,
                                        location: batteryFormData.location.value,
                                        technicalStatus: batteryFormData?.technicalStatus.value,
                                        batteryType: batteryFormData.batteryType.value,
                                        maxCellVoltage: batteryFormData.maxCellVoltage,
                                        minCellVoltage: batteryFormData.minCellVoltage,
                                        nrEsu: batteryFormData.nrEsu,
                                        nrChargingCycles: +batteryFormData.nrChargingCycles,
                                        nrUsageCycles: +batteryFormData.nrUsageCycles,
                                        weight: batteryFormData.weight,
                                        firstUsageTime: batteryFormData.firstUsageTime
                                            ? batteryFormData.firstUsageTime.toISOString()
                                            : "",
                                        lastChargeTime: batteryFormData.lastChargeTime
                                            ? batteryFormData.lastChargeTime.toISOString()
                                            : "",
                                        maxChargingTime: +batteryFormData.maxChargingTime,
                                    };
                                    sendRequestById(batteryId || -1, { data })
                                        .then((response) => {
                                            if (response) {
                                                onSuccess(t("battery.edit.success"));
                                            }
                                        })
                                        .catch((error) => {
                                            if (error.response && error.response.data.error) {
                                                onError(error.response.data.error);
                                            }
                                        })
                                        .finally(() => navigation(".."));
                                }}
                            >
                                <FormControl fieldName="name" isNotEditable />
                                <FormControl fieldName="validFrom" />
                                <FormControl fieldName="validTo" />
                                <FormControl fieldName="actStatus" isNotEditable />
                                <FormControl fieldName="flightPermits" isNotEditable />
                                <FormControl fieldName="location" />
                                <FormControl fieldName="technicalStatus" isNotEditable />
                                <FormControl fieldName="batteryType" />
                                <FormControl fieldName="maxCellVoltage" isNotEditable />
                                <FormControl fieldName="minCellVoltage" isNotEditable />
                                <FormControl fieldName="nrEsu" />
                                <FormControl fieldName="nrChargingCycles" isNotEditable />
                                <FormControl fieldName="nrUsageCycles" isNotEditable />
                                <FormControl fieldName="weight" isNotEditable />
                                <FormControl fieldName="firstUsageTime" isNotEditable />
                                <FormControl fieldName="lastChargeTime" isNotEditable />
                                <FormControl fieldName="maxChargingTime" isNotEditable />
                            </FormProvider>
                        </TabPanel>
                    )}
                    (
                    <TabPanel width="fit-content">
                        {batteryGetState === "success" && (
                            <HStack spacing={4}>
                                <Button variant="primary" onClick={handleEsuUnassign} isDisabled={allEsusUnassigned}>
                                    {t("battery.edit.unassign button")}
                                </Button>
                                <Box>{t("battery.edit.esu count")}</Box>
                                <Tag
                                    colorScheme={esuColor}
                                >{`${assignedEsus.length} / ${batteryInitialValues.nrEsu}`}</Tag>
                            </HStack>
                        )}

                        <Divider height="10px" />
                        <VStack alignItems="flex-start" wordBreak="break-all" width="100%">
                            {assignedEsus && batteryGetState === "success" && (
                                <Table
                                    {...esuTableProps}
                                    data={assignedEsus.map((esu: Esu) => {
                                        return {
                                            id: esu.id.toString(),
                                            name: esu.name,
                                            status: esu.status,
                                            technicalStatus: esu.technicalStatus,
                                            location: esu.location!.name,
                                            flightPermits: esu.flightPermits!,
                                        };
                                    })}
                                    rowSelectProps={{
                                        isRowSelectable: true,
                                        onRowSelect: (selectedData: EsuListItem[]) => {
                                            selectedIdsToUnassign.ids = selectedData
                                                ? selectedData.map((item) => item.id)
                                                : [];
                                        },
                                        toggleAllRowsSelectLabel: "Assign all ESUs",
                                        toggleRowSelectLabel: "Assign ESU",
                                    }}
                                />
                            )}
                        </VStack>
                    </TabPanel>
                    <TabPanel width="fit-content" data-testid="tabpanel-esu-unassign">
                        {batteryGetState === "success" && (
                            <HStack spacing={4}>
                                <Button variant="primary" onClick={handleEsuAssign} isDisabled={allEsusAssigned}>
                                    {t("battery.edit.assign button")}
                                </Button>
                                <Box>{t("battery.edit.esu count")}</Box>
                                <Tag
                                    colorScheme={esuColor}
                                >{`${assignedEsus.length} / ${batteryInitialValues.nrEsu}`}</Tag>
                            </HStack>
                        )}
                        <Divider height="10px" />
                        {assignableEsus && batteryGetState === "success" && (
                            <Table
                                {...esuTableProps}
                                data={assignableEsus.map((esu: Esu) => {
                                    return {
                                        id: esu.id.toString(),
                                        name: esu.name,
                                        status: esu.status,
                                        technicalStatus: esu.technicalStatus,
                                        location: esu.location!.name,
                                        flightPermits: esu.flightPermits!,
                                    };
                                })}
                                rowSelectProps={{
                                    isRowSelectable: true,
                                    onRowSelect: (selectedData: EsuListItem[]) => {
                                        selectedIdsToAssign.ids = selectedData
                                            ? selectedData.map((item) => item.id)
                                            : [];
                                    },
                                    toggleAllRowsSelectLabel: "Assign all ESUs",
                                    toggleRowSelectLabel: "Assign ESU",
                                }}
                            />
                        )}
                    </TabPanel>
                    )
                </TabPanels>
            </Tabs>
        </ResourceCreateLayout>
    );
};
