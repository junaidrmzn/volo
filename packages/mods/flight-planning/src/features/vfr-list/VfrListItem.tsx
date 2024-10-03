import {
    Box,
    Button,
    Checkbox,
    Divider,
    HStack,
    Icon,
    ListItem,
    Text,
    VStack,
    useToast,
} from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../translations";
import type { VfrLayer } from "./types";

type VfrListItemProps = {
    vfrLayer: VfrLayer;
    displayConfirmationModal: () => void;
    setVfrLayerToDelete: React.Dispatch<React.SetStateAction<VfrLayer | undefined>>;
    selectedVfrLayers: string[];
    handleVfrLayerSelection: (option: string) => void;
};

export const VfrListItem = (props: VfrListItemProps) => {
    const { vfrLayer, displayConfirmationModal, setVfrLayerToDelete, selectedVfrLayers, handleVfrLayerSelection } =
        props;
    const { t } = useFlightPlanningTranslation();
    const toast = useToast();

    const mapName = vfrLayer.file_name.replace(/_/g, " ").replace(/.mbtiles/g, "");

    return (
        <ListItem mt={3}>
            <HStack justifyContent="space-between" flex="0 1">
                <VStack px={3} width="100%" textAlign="left" alignItems="flex-start">
                    <Text lineHeight="short" fontWeight="600" fontSize="ms">
                        {mapName}
                    </Text>
                    <Box flexDirection="column" width="100%">
                        <HStack width="50%">
                            <Text lineHeight="short" fontWeight={300}>
                                Type:
                            </Text>
                            <Text lineHeight="short" fontWeight={300}>
                                {vfrLayer.vfr_type}
                            </Text>
                        </HStack>
                    </Box>
                    <Box flexDirection="column" width="100%">
                        <HStack width="50%">
                            <Text lineHeight="short" fontWeight={300}>
                                {t("vfrLayer.metadata.validTo")}
                            </Text>
                            <Text lineHeight="short" fontWeight={300}>
                                {vfrLayer.valid_to}
                            </Text>
                        </HStack>
                    </Box>
                    <Button
                        variant="ghost"
                        data-testid={`vfr-map-delete-button-${vfrLayer.id}`}
                        aria-label={`vfr-map-delete-button-${vfrLayer.id}`}
                        key={vfrLayer.file_name}
                        onClick={() => {
                            setVfrLayerToDelete(vfrLayer);
                            displayConfirmationModal();
                        }}
                        mt="0"
                    >
                        <HStack m={0}>
                            <Text fontSize="sm" fontWeight="600">
                                {t("vfrLayer.confirmDeleteModal.title")}
                            </Text>
                            <Icon icon="delete" />
                        </HStack>
                    </Button>
                    {/* Add Translations */}
                </VStack>

                <Checkbox
                    name={`${vfrLayer.file_name}`}
                    onChange={() => {
                        if (selectedVfrLayers.length === 3 && !selectedVfrLayers.includes(`${vfrLayer.file_name}`)) {
                            toast({
                                title: t("vfrLayer.maxSelections.title"),
                                description: t("vfrLayer.maxSelections.description"),
                                status: "error",
                            });
                        } else {
                            handleVfrLayerSelection(`${vfrLayer.file_name}`);
                        }
                    }}
                    isChecked={selectedVfrLayers.includes(`${vfrLayer.file_name}`)}
                />
            </HStack>
            <Divider pb={3} />
        </ListItem>
    );
};
