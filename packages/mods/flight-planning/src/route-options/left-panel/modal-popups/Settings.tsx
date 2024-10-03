import {
    Box,
    Divider,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    Text,
    useColorModeValue,
} from "@volocopter/design-library-react";
import { useSettings } from "../../custom-hooks/useSettings";
import { FloatingModal } from "../generic/FloatingModal";
import { useRouteOptionMetaTranslation } from "../route-option-meta/translations";
import settingsFields from "./settingsFeilds.json";

type SettingsProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Settings = (props: SettingsProps) => {
    const { parameterValue, setParameterValue } = useSettings();

    const { isOpen, onClose } = props;
    const { t } = useRouteOptionMetaTranslation();
    const background = useColorModeValue("monochrome.100", "customBackground");

    return (
        <FloatingModal
            isOpen={isOpen}
            onClose={onClose}
            size="xxl"
            title={t("common.select")}
            saveTitle={t("common.done")}
            cancelTitle={t("common.cancel")}
            hasFooter
        >
            <Box mb={4}>
                <Text m={2} fontSize={12} fontWeight={400}>
                    {t("settings.parameterSet")}
                </Text>
                <HStack m={2}>
                    <InputGroup>
                        <Input
                            aria-label="paramter"
                            fontSize="sm"
                            variant="outline"
                            onChange={(event) => setParameterValue(event.target.value)}
                            value={parameterValue ?? ""}
                        />
                    </InputGroup>
                    <IconButton aria-label="copy" variant="ghost" size="md">
                        <Icon icon="copy" size={4} />
                    </IconButton>
                    <IconButton aria-label="save" variant="ghost" size="md">
                        <Icon icon="save" size={4} />
                    </IconButton>
                </HStack>
            </Box>
            <Divider />
            <Box as="fieldset" m={2}>
                <Grid templateRows="repeat(10, 1fr)" gap={3} gridAutoFlow="column">
                    {Object.entries(settingsFields).map(([category, values]) => (
                        <>
                            <Text fontWeight={600} fontSize={14}>
                                {category}
                            </Text>

                            {Object.entries(values).map(([key, value]) => (
                                <GridItem key={key}>
                                    <Text fontSize={12} fontWeight={500} color={background}>
                                        {value}
                                    </Text>
                                    <Input placeholder={value} />
                                </GridItem>
                            ))}
                        </>
                    ))}
                </Grid>
            </Box>
        </FloatingModal>
    );
};
