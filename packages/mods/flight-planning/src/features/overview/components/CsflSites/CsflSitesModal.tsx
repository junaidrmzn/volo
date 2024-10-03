import {
    Button,
    HStack,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import type { Route } from "@voloiq/flight-planning-api/v1";
import { useGetCsflSitesQuery } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../../translations";
import { CsflSiteCheckboxList } from "./CsflSiteCheckboxList";
import { useSelectedCsflSites } from "./useSelectedCsflSites";

type CsflSitesModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedRoute: Route;
};

export const CsflSitesModal = (props: CsflSitesModalProps) => {
    const { isOpen, onClose, selectedRoute } = props;
    const { t } = useFlightPlanningTranslation();
    const { checkedItems, handleChange, handleSubmit } = useSelectedCsflSites({ onClose, selectedRoute });
    const { isFetching, data: allCsflSitesData } = useGetCsflSitesQuery({
        routeId: selectedRoute.id,
        isEnabled: !!selectedRoute.id,
    });

    return (
        <Modal size="md" isCentered isOpen={isOpen} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent padding="24px">
                <ModalHeader data-testid="form-modal-heading">{t("csfl.details.title")}</ModalHeader>
                {allCsflSitesData && (
                    <CsflSiteCheckboxList
                        handleChange={handleChange}
                        checkedItems={checkedItems}
                        allCsflSitesData={allCsflSitesData}
                        isFetching={isFetching}
                    />
                )}
                <ModalFooter>
                    <HStack justifyContent="end">
                        <Button variant="secondary" onClick={onClose} data-testid="form-modal-cancel-button">
                            {t("common.cancel")}
                        </Button>
                        <Button
                            variant="primary"
                            data-testid="form-modal-save-button"
                            onClick={handleSubmit}
                            isDisabled={isFetching || allCsflSitesData?.length === 0}
                        >
                            {t("common.save")}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
