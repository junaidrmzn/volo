import {
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Icon,
    IconButton,
    Select,
    SimpleGrid,
    Stack,
} from "@volocopter/design-library-react";
import type {
    TestPointAttempt,
    TestPointAttemptInsert,
    TestPointAttemptPatch,
} from "@voloiq/flight-test-definition-api/v2";
import { useTestPointAttemptModalV2Translation } from "../translations/useTestPointAttemptModalV2Translation";
import { useTestPointAttemptModalFormV2 } from "./useTestPointAttemptModalFormV2";

type TestPointAttemptModalFormV2Props = {
    testPointAttempt?: TestPointAttempt;
    onClose: () => void;
    onSubmit:
        | ((testPointAttempt: TestPointAttemptInsert) => void)
        | ((testPointAttempt: TestPointAttemptPatch) => void);
    submitButtonIsLoading?: boolean;
};

export const TestPointAttemptModalFormV2 = (props: TestPointAttemptModalFormV2Props) => {
    const { testPointAttempt, onSubmit, onClose, submitButtonIsLoading = false } = props;
    const { t } = useTestPointAttemptModalV2Translation();

    const {
        getFlightTestStatusProps,
        editedTestPointAttempt,
        getEngineeringStatusProps,
        getTestPointEngineeringActionProps,
    } = useTestPointAttemptModalFormV2(testPointAttempt);

    return (
        <Stack width="full" px="3" py="3" bg="gray.300" spacing="3">
            <HStack justify="space-between">
                <Heading fontSize="sm" fontWeight="bold" color="darkBlue.700">
                    {t("form.Update Status")}
                </Heading>

                <HStack spacing="4">
                    <IconButton
                        variant="ghost"
                        icon={<Icon icon="check" size={5} />}
                        aria-label={t("form.Submit edit")}
                        onClick={() => onSubmit(editedTestPointAttempt)}
                        isLoading={submitButtonIsLoading}
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
                    <FormControl>
                        <FormLabel>{t("form.Flight Test Status.label")}</FormLabel>
                        <Select
                            name={t("form.Flight Test Status.label")}
                            placeholder={t("form.Flight Test Status.label")}
                            {...getFlightTestStatusProps()}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("form.Test Point Engineering Status.label")}</FormLabel>
                        <Select
                            name={t("form.Test Point Engineering Status.label")}
                            placeholder={t("form.Test Point Engineering Status.label")}
                            {...getEngineeringStatusProps()}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("form.Test Point Engineering Action.label")}</FormLabel>
                        <Select
                            name={t("form.Test Point Engineering Action.label")}
                            placeholder={t("form.Test Point Engineering Action.label")}
                            {...getTestPointEngineeringActionProps()}
                        />
                    </FormControl>
                </SimpleGrid>
            </HStack>
        </Stack>
    );
};
