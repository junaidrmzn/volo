import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal } from "@volocopter/design-library-react";
import { useRouteCardTranslation } from "./translations";

export const RouteMenu = () => {
    const { t } = useRouteCardTranslation();

    return (
        <Menu placement="right-start">
            <MenuButton
                as={IconButton}
                size="sm"
                aria-label={t("menu.open")}
                icon={<Icon icon="ellipsis" size={4} />}
                variant="ghost"
            />
            <Portal>
                <MenuList>
                    <MenuItem icon={<Icon icon="edit" size={4} />}>{t("menu.editName")}</MenuItem>
                    <MenuItem icon={<Icon icon="save" size={4} />}>{t("menu.saveAsTemplate")}</MenuItem>
                    <MenuItem icon={<Icon icon="delete" size={4} />}>{t("menu.deleteRoute")}</MenuItem>
                    <MenuItem icon={<Icon icon="file" size={4} />}>{t("menu.uploadSimulatorCSV")}</MenuItem>
                    <MenuItem icon={<Icon icon="download" size={4} />}>{t("menu.exportRouteKml")}</MenuItem>
                    <MenuItem icon={<Icon icon="download" size={4} />}>{t("menu.exportRouteCsv")}</MenuItem>
                    <MenuItem icon={<Icon icon="download" size={4} />}>{t("menu.exportRouteExcel")}</MenuItem>
                    <MenuItem icon={<Icon icon="repeat" size={4} />}>{t("menu.computeAltitudeProfile")}</MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    );
};
