import {
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Text,
    useDisclosure,
} from "@volocopter/design-library-react";
import { RequirePermissions, useIsAuthorizedTo } from "@voloiq/auth";
import { Route } from "@voloiq/flight-planning-api/v1";
import { FormProvider } from "@voloiq/form";
import { FormModal } from "../../../components";
import { useFlightPlanningTranslation } from "../../../translations";
import { useRouteDetailsHeader } from "../hooks";
import { UploadSimLogFileModal } from "./upload-simlog-file";

type RouteDetailsHeaderProps = {
    route: Route;
};
export const RouteDetailsHeader = (props: RouteDetailsHeaderProps) => {
    const { route } = props;
    const { isOpen: isOpenRouteName, onOpen: onOpenRouteName, onClose: onCloseRouteName } = useDisclosure();
    const { isOpen: isOpenSaveTemplate, onOpen: onOpenSaveTemplate, onClose: onCloseSaveTemplate } = useDisclosure();
    const {
        isOpen: isOpenUploadSimLogFile,
        onOpen: onOpenUploadSimLogFile,
        onClose: onCloseUploadSimLogFile,
    } = useDisclosure();
    const { t: translate } = useFlightPlanningTranslation();
    const {
        handleSaveAsTemplate,
        createSaveAsRouteSchema,
        handleDeleteRoute,
        handleExportRouteKml,
        handleExportRouteCsv,
        handleExportRouteExcel,
        FormControlRouteName,
        FormControlTemplateName,
        createRouteEditSchema,
        handleEditName,
        handleBackButton,
    } = useRouteDetailsHeader(route);
    const isAuthRouteUpdate = useIsAuthorizedTo(["update"], ["Route"]);
    const isAuthRouteDelete = useIsAuthorizedTo(["delete"], ["Route"]);
    const isAuthRouteTemplateCreate = useIsAuthorizedTo(["create"], ["RouteTemplate"]);

    return (
        <HStack justifyContent="space-between" h="48px" p={3} flex="0 1 auto">
            <IconButton
                onClick={handleBackButton}
                variant="ghost"
                size="lg"
                aria-label={translate("routeDetails.back")}
                data-testid="route-details-back-button"
                icon={<Icon icon="chevronLeft" />}
            />
            <Text
                size="small"
                fontWeight="bold"
                textAlign="center"
                pos="absolute"
                left="50%"
                transform="translateX(-50%)"
            >
                {route.name ?? "Details"}
            </Text>
            <Menu placement="right-start">
                {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                    <MenuButton
                        as={IconButton}
                        size="lg"
                        aria-label={translate("routeDetails.menu.open")}
                        icon={<Icon icon="ellipsisVertical" />}
                        variant="ghost"
                        data-testid="route-details-menu-button"
                    />
                )}
                <Portal>
                    <MenuList>
                        <RequirePermissions resources={["Route"]} actions={["update"]}>
                            <MenuItem
                                icon={<Icon icon="edit" />}
                                onClick={onOpenRouteName}
                                data-testid="menu-edit-route-name-button"
                            >
                                {translate("routeDetails.menu.editName")}
                            </MenuItem>
                        </RequirePermissions>
                        <RequirePermissions resources={["RouteTemplate"]} actions={["create"]}>
                            <MenuItem
                                icon={<Icon icon="layer" />}
                                onClick={onOpenSaveTemplate}
                                data-testid="menu-save-route-as-template-button"
                            >
                                {translate("routeDetails.menu.saveAsTemplate")}
                            </MenuItem>
                        </RequirePermissions>
                        <RequirePermissions resources={["Route"]} actions={["delete"]}>
                            <MenuItem
                                icon={<Icon icon="delete" />}
                                onClick={handleDeleteRoute}
                                data-testid="menu-delete-route-button"
                            >
                                {translate("routeDetails.menu.deleteRoute")}
                            </MenuItem>
                        </RequirePermissions>
                        <RequirePermissions resources={["Route"]} actions={["create"]}>
                            <MenuItem icon={<Icon icon="file" />} onClick={onOpenUploadSimLogFile}>
                                {translate("routeDetails.menu.uploadSimulatorCSV")}
                            </MenuItem>
                        </RequirePermissions>
                        {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                            <MenuItem
                                icon={<Icon icon="download" />}
                                onClick={handleExportRouteKml}
                                data-testid="menu-export-route-kml-button"
                            >
                                {translate("routeDetails.menu.exportRouteKml")}
                            </MenuItem>
                        )}
                        {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                            <MenuItem
                                icon={<Icon icon="download" />}
                                onClick={handleExportRouteCsv}
                                data-testid="menu-export-route-csv-button"
                            >
                                {translate("routeDetails.menu.exportRouteCsv")}
                            </MenuItem>
                        )}
                        {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                            <MenuItem
                                icon={<Icon icon="download" />}
                                onClick={handleExportRouteExcel}
                                data-testid="menu-export-route-excel-button"
                            >
                                {translate("routeDetails.menu.exportRouteExcel")}
                            </MenuItem>
                        )}
                    </MenuList>
                </Portal>
            </Menu>
            <FormModal
                isOpen={isOpenRouteName}
                handleClose={onCloseRouteName}
                heading={translate("routeDetails.menu.editName")}
                formId="routeEditForm"
            >
                <FormProvider
                    formId="routeEditForm"
                    formType="edit"
                    initialValues={route}
                    schema={createRouteEditSchema}
                    onEdit={handleEditName}
                >
                    <FormControlRouteName fieldName="name" />
                </FormProvider>
            </FormModal>
            <FormModal
                isOpen={isOpenSaveTemplate}
                handleClose={onCloseSaveTemplate}
                heading={translate("routeDetails.menu.saveAsTemplate")}
                formId="saveAsTemplateForm"
            >
                <FormProvider
                    formId="saveAsTemplateForm"
                    formType="create"
                    initialValues={route}
                    schema={createSaveAsRouteSchema}
                    onCreate={(formData) => {
                        handleSaveAsTemplate(formData);
                        onCloseSaveTemplate();
                    }}
                >
                    <FormControlTemplateName fieldName="name" />
                </FormProvider>
            </FormModal>
            <UploadSimLogFileModal
                routeId={route.id}
                isOpen={isOpenUploadSimLogFile}
                onClose={onCloseUploadSimLogFile}
            />
        </HStack>
    );
};
