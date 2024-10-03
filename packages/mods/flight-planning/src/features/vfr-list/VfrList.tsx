import {
    Box,
    Divider,
    FileUpload,
    HStack,
    Heading,
    Icon,
    IconButton,
    List,
    Select,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../translations";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { VfrListItem } from "./VfrListItem";
import { UploadProgress } from "./file-upload/UploadProgress";
import { EnterMetadataStep } from "./file-upload/enterMetaData";
import { useFileupload } from "./file-upload/useFileupload";
import type { VfrLayer } from "./types";
import { useVfrList } from "./useVfrList";

type SelectOption = {
    value?: string | null;
    label: string;
};

type VfrListProps = {
    selectedVfrLayers: string[];
    handleVfrLayerSelection: (selectedVfrLayers: string) => void;
    vfrLayersList: VfrLayer[] | undefined;
    closeRightSidebar: () => void;
};

export const VfrList = (props: VfrListProps) => {
    const { selectedVfrLayers, handleVfrLayerSelection, vfrLayersList, closeRightSidebar } = props;
    const {
        selectedOption,
        availableRegions,
        isDeleteModalOpen,
        changeSelectedOption,
        createRegionOptions,
        setVfrLayerToDelete,
        displayConfirmationModal,
        handleDeleteModalCancel,
        handleDeleteConfirmation,
    } = useVfrList({ vfrLayersList, handleVfrLayerSelection });
    const { t } = useFlightPlanningTranslation();
    const { file, setFile, handleDelete, uploadStatus, changeUploadTileId } = useFileupload();

    return (
        <VStack align="start" height="100%" width="100%">
            <Box p={3} flexDirection="column" width="100%">
                <HStack justifyContent="space-between" width="100%">
                    <IconButton
                        variant="ghost"
                        aria-label="close"
                        onClick={closeRightSidebar}
                        data-testid="vfr-list-close-button"
                    >
                        <Icon icon="close" color="darkBlue.300" />
                    </IconButton>
                    <Heading size="md" fontWeight="bold" data-testid="vfr-sidebar-header">
                        Aeronautical maps
                    </Heading>
                    <Box height="36px" width="40px" />
                </HStack>
            </Box>

            <Box pr={10} pl={10} flexDirection="column" width="100%" justifyContent="center" textAlign="center">
                {vfrLayersList && vfrLayersList.length > 1 ? (
                    <Select<SelectOption>
                        onMenuOpen={() => createRegionOptions()}
                        onChange={(option: SelectOption | null) => {
                            changeSelectedOption(option);
                        }}
                        value={{
                            label: selectedOption ? selectedOption.label : `${t("vfrLayer.selectRegion")}...`,
                        }}
                        options={availableRegions}
                    />
                ) : (
                    vfrLayersList?.length === 0 && (
                        <Box>
                            <Text mt={2}>{t("vfrLayer.noEntries")}</Text>
                        </Box>
                    )
                )}
            </Box>
            <Box width="100%" flexGrow={1} overflowY="auto">
                <List width="100%" pr={5}>
                    <Divider />
                    {vfrLayersList &&
                        vfrLayersList.map((vfrLayer) => {
                            if (selectedOption?.value === undefined || vfrLayer.region_id === selectedOption?.label) {
                                return (
                                    <VfrListItem
                                        vfrLayer={vfrLayer}
                                        key={vfrLayer.file_name}
                                        displayConfirmationModal={displayConfirmationModal}
                                        setVfrLayerToDelete={setVfrLayerToDelete}
                                        handleVfrLayerSelection={handleVfrLayerSelection}
                                        selectedVfrLayers={selectedVfrLayers}
                                    />
                                );
                            }
                            return null;
                        })}
                </List>

                <FileUpload
                    accept={[".mbtiles"]}
                    deleteAriaLabel="Delete"
                    rejectedFilesErrorMessage="This file type is not supported. Please select a .mbtiles file."
                    selectFilesLabel="Select file"
                    dropFilesLabel="Drop file here"
                    orLabel="or"
                    files={file}
                    onAdd={setFile}
                    onDelete={handleDelete}
                />
                {file.length === 0 && (
                    <Text textAlign="left" mb={5} pl={5} pt={1} fontSize="sm">
                        Allowed file types: mbtiles
                    </Text>
                )}
                {file.length > 0 && uploadStatus?.status === "idle" && (
                    <Box>
                        <EnterMetadataStep changeUploadTileId={changeUploadTileId} />
                    </Box>
                )}
                {uploadStatus?.status === "pending" && <UploadProgress uploadStatus={uploadStatus} />}
                <ConfirmDeleteModal
                    key="vfrLayer.delete"
                    descriptionText={t("vfrLayer.confirmDeleteModal.description")}
                    isOpen={isDeleteModalOpen}
                    onCancel={handleDeleteModalCancel}
                    onConfirm={() => handleDeleteConfirmation(selectedVfrLayers)}
                />
            </Box>
        </VStack>
    );
};
