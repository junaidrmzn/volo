import {
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Icon,
    IconButton,
    Input,
    Select,
    SimpleGrid,
    Stack,
} from "@volocopter/design-library-react";
import { DateTimeInput } from "@voloiq/date-time-input";
import type {
    TestPointAttempt,
    TestPointAttemptInsert,
    TestPointAttemptPatch,
} from "@voloiq/flight-test-definition-api/v1";
import { useTestPointAttemptModalTranslation } from "../translations/useTestPointAttemptModalTranslation";
import { useTestPointAttemptModalForm } from "./useTestPointAttemptModalForm";

type TestPointAttemptModalFormProps = {
    testPointAttempt?: TestPointAttempt;
    onClose: () => void;
    onSubmit:
        | ((testPointAttempt: TestPointAttemptInsert) => void)
        | ((testPointAttempt: TestPointAttemptPatch) => void);
    submitButtonIsLoading?: boolean;
};

export const TestPointAttemptModalForm = (props: TestPointAttemptModalFormProps) => {
    const { testPointAttempt, onSubmit, onClose, submitButtonIsLoading = false } = props;
    const { t } = useTestPointAttemptModalTranslation();

    const {
        getFtoIdProps,
        getDateProps,
        getPanningStatusProps,
        getFlightTestStatusProps,
        getEngineeringStatusProps,
        getEngineeringActionProps,
        getFlightStatusProps,
        editedTestPointAttempt,
        isValidTestpointAttempt,
    } = useTestPointAttemptModalForm(testPointAttempt);

    return (
        <Stack width="full" px="3" py="3" bg="gray.300" spacing="3">
            <HStack justify="space-between">
                <Heading fontSize="sm" fontWeight="bold" color="darkBlue.700">
                    {testPointAttempt ? t("form.Update Status") : t("form.Add New Status")}
                </Heading>

                <HStack spacing="4">
                    <IconButton
                        variant="ghost"
                        icon={<Icon icon="check" size={5} />}
                        aria-label={t("form.Submit edit")}
                        onClick={() => onSubmit(editedTestPointAttempt)}
                        isLoading={submitButtonIsLoading}
                        isDisabled={!isValidTestpointAttempt || submitButtonIsLoading}
                    />
                    <IconButton
                        variant="ghost"
                        icon={<Icon icon="close" size={4} />}
                        aria-label={t("form.Cancel edit")}
                        onClick={onClose}
                        isDisabled={submitButtonIsLoading}
                    />
                </HStack>
            </HStack>

            <HStack spacing="4">
                <SimpleGrid columns={3} spacing="4" boxSize="full">
                    <SimpleGrid columns={2} spacing="3">
                        <FormControl>
                            <FormLabel>{t("form.FTO")}</FormLabel>
                            <Input placeholder={t("form.FTO")} {...getFtoIdProps()} />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="DateInput">{t("form.Date")}</FormLabel>
                            <DateTimeInput
                                mode="date"
                                withUtcTime
                                controlId="DateInput"
                                placeholder={t("form.Date")}
                                {...getDateProps()}
                            />
                        </FormControl>
                    </SimpleGrid>
                    <FormControl>
                        <FormLabel>{t("form.Planning Status.label")}</FormLabel>
                        <Select
                            name={t("form.Planning Status.label")}
                            placeholder={t("form.Planning Status.label")}
                            {...getPanningStatusProps()}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("form.Flight Status.label")}</FormLabel>
                        <Select
                            name={t("form.Flight Status.label")}
                            placeholder={t("form.Flight Status.label")}
                            {...getFlightStatusProps()}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>{t("form.Flight Test Evaluation Status.label")}</FormLabel>
                        <Select
                            name={t("form.Flight Test Evaluation Status.label")}
                            placeholder={t("form.Flight Test Evaluation Status.label")}
                            {...getFlightTestStatusProps()}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("form.Engineering Status.label")}</FormLabel>
                        <Select
                            name={t("form.Engineering Status.label")}
                            placeholder={t("form.Engineering Status.label")}
                            {...getEngineeringStatusProps()}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("form.Engineering Action.label")}</FormLabel>
                        <Select
                            name={t("form.Engineering Action.label")}
                            placeholder={t("form.Engineering Action.label")}
                            {...getEngineeringActionProps()}
                        />
                    </FormControl>
                </SimpleGrid>
            </HStack>
        </Stack>
    );
};
