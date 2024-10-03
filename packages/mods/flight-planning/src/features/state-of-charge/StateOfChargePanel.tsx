import { Box, HStack, Icon, IconButton, useColorModeValue } from "@volocopter/design-library-react";
import { useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { BatteryAndTemperatureCharts } from "./BatteryAndTemperatureGraphs";
import { OperationalLimitsChart } from "./operational-limits";

function useModal(initialState = false) {
    const [isModalOpen, setModalOpen] = useState(initialState);

    function toggleModal() {
        setModalOpen((currentlyOpen) => !currentlyOpen);
    }
    return { isModalOpen, toggleModal };
}

type StateOfChargePanelProps = {
    handleClose: () => void;
};
export const StateOfChargePanel = (props: StateOfChargePanelProps) => {
    const { handleClose } = props;
    const bgColor = useColorModeValue("white", "gray.900");
    const { isModalOpen, toggleModal } = useModal(false);
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const canReadFullEnvelopeValidation = useIsAuthorizedTo(["read"], ["FullEnvelopeValidation"]);

    return (
        <Box
            overflowY="scroll"
            flexDirection="column"
            bgColor={bgColor}
            pos="absolute"
            top={isModalOpen ? "50%" : 20}
            right={isModalOpen ? "50%" : 20}
            transform={isModalOpen ? "translate(50%, -50%)" : undefined}
            width={isModalOpen ? "calc(95vw - 2rem)" : "46rem"}
            height={isModalOpen ? "56.5rem" : "48.5rem"}
            alignItems="normal"
            boxShadow="lg"
            borderRadius="lg"
            data-testid="state-of-charge-panel"
        >
            <HStack justifyContent="space-between" p={3} flex="0 1 auto">
                <IconButton
                    variant="ghost"
                    aria-label="close"
                    onClick={handleClose}
                    data-testid="state-of-charge-close-button"
                >
                    <Icon icon="close" color="darkBlue.300" />
                </IconButton>
                <IconButton variant="ghost" aria-label="enlarge" onClick={toggleModal}>
                    <Icon icon={isModalOpen ? "minimize" : "maximize"} color="darkBlue.300" />
                </IconButton>
            </HStack>
            {isFeatureFlagEnabled("vfp-835") && canReadFullEnvelopeValidation && (
                <OperationalLimitsChart isModalOpen={isModalOpen} />
            )}
            <BatteryAndTemperatureCharts isModalOpen={isModalOpen} />
        </Box>
    );
};
