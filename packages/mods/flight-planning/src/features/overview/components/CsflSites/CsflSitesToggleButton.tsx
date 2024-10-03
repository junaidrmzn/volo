import { Box, FormControl, HStack, ListItem, Switch, Text, useDisclosure } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { CsflSitesModal } from "./CsflSitesModal";

type CsflSitesToggleButtonProps = {
    showCsflSites: boolean;
    handleShowCsflSites: () => void;
    selectedRoute?: Route;
};

export const CsflSitesToggleButton = (props: CsflSitesToggleButtonProps) => {
    const { showCsflSites, handleShowCsflSites, selectedRoute } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChangeCsflSites = () => {
        handleShowCsflSites();

        if (!showCsflSites) {
            onOpen();
        }
    };

    return (
        <Box>
            <ListItem>
                <HStack justifyContent="space-between" flex="0 1 auto">
                    <Text size="small">CSFL Sites</Text>
                    <Box>
                        <FormControl>
                            <Switch
                                data-testid="switch-show-csfl-sites"
                                isChecked={showCsflSites}
                                onChange={handleChangeCsflSites}
                                isDisabled={!selectedRoute}
                            />
                        </FormControl>
                    </Box>
                </HStack>
            </ListItem>
            {selectedRoute && <CsflSitesModal isOpen={isOpen} onClose={onClose} selectedRoute={selectedRoute} />}
        </Box>
    );
};
