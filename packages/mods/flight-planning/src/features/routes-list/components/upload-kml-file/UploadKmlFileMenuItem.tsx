import { Icon, MenuItem, useDisclosure } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../../../translations";
import { UploadKmlFileModal } from "./UploadKmlFileModal";

type UploadKmlFileMenuItemProps = {
    routeOptionId: number | string;
};
export const UploadKmlFileMenuItem = (props: UploadKmlFileMenuItemProps) => {
    const { routeOptionId } = props;
    const { t: translate } = useFlightPlanningTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem icon={<Icon icon="file" />} onClick={onOpen}>
                {translate("routeList.menu.uploadRouteOptionKml")}
            </MenuItem>
            <UploadKmlFileModal routeOptionId={routeOptionId} isOpen={isOpen} onClose={onClose} />
        </>
    );
};
