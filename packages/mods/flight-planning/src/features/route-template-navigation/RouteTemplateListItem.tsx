import {
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@volocopter/design-library-react";
import type { MouseEvent } from "react";
import { RequirePermissions } from "@voloiq/auth";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { RouteTemplate, useDeleteRouteTemplate } from "@voloiq/flight-planning-api/v1";
import { useParams } from "@voloiq/routing";
import { useCreateRoute } from "../../api-hooks";
import { useFlightPlanningTranslation } from "../../translations";
import { useRefocusCallback } from "../overview/hooks";
import { useSelectedRoute } from "../selected-route";

type RouteTemplateListItemProps = {
    routeTemplate: RouteTemplate;
    onSelectRouteTemplatePreview: (routeTemplate: RouteTemplate | undefined) => void;
    isSelected: boolean;
    inversed?: boolean;
    routeOption: RouteOption;
};

export const RouteTemplateListItem = (props: RouteTemplateListItemProps) => {
    const { routeTemplate, onSelectRouteTemplatePreview, isSelected, inversed, routeOption } = props;
    const { t: translate, i18n } = useFlightPlanningTranslation();
    const { selectRoute } = useSelectedRoute();
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: "medium" });
    const { routeOptionId } = useParams();
    const backgroundColor = useColorModeValue("grey.900", "grey.900");

    const { handleRefocusCallback } = useRefocusCallback(undefined, routeOption);
    const { createRouteAsync } = useCreateRoute(routeOptionId!);

    const { deleteRouteTemplate } = useDeleteRouteTemplate();

    const handleAddToRoute = (event: MouseEvent) => {
        event.stopPropagation();
        createRouteAsync({
            name: routeTemplate.name,
            routeTemplateId: routeTemplate.id,
            plannedBy: "Route Planner",
        }).then((responseData) => {
            if (responseData) selectRoute(responseData.data!.id);
            onSelectRouteTemplatePreview(undefined);
            handleRefocusCallback();
        });
    };

    const handleDelete = async (event: MouseEvent) => {
        event.stopPropagation();
        deleteRouteTemplate(routeTemplate);
        onSelectRouteTemplatePreview(undefined);
    };

    const handlePreview = () => {
        onSelectRouteTemplatePreview(routeTemplate);
    };

    return (
        <Tr
            width="100%"
            data-testid={`route-template-list-item-${routeTemplate.id}`}
            style={{ cursor: "pointer" }}
            onClick={handlePreview}
            isSelected={isSelected}
        >
            <Td p={2} pl={4} whiteSpace="pre-wrap">
                {routeTemplate.name}
            </Td>
            <Td p={2}>{inversed ? <Icon icon="arrowLeft" /> : <Icon icon="arrowRight" />}</Td>
            <Td p={2} whiteSpace="nowrap">
                <Text textAlign="right" fontSize="xs">
                    {routeTemplate.createdAt ? dateFormatter.format(new Date(routeTemplate.createdAt)) : ""}
                </Text>
            </Td>
            <Td p={2} whiteSpace="nowrap" textAlign="end">
                <RequirePermissions resources={["Route"]} actions={["create"]}>
                    <IconButton
                        color={backgroundColor}
                        variant="ghost"
                        aria-label={translate("routeTemplates.routeTemplateListItem.addToFlight")}
                        onClick={(event: MouseEvent) => {
                            handleAddToRoute(event);
                        }}
                        data-testid={`add-route-template-to-flight-${routeTemplate.id}`}
                    >
                        <Icon icon="add" />
                    </IconButton>
                </RequirePermissions>
                <RequirePermissions resources={["RouteTemplate"]} actions={["delete"]}>
                    <Menu placement="left-start">
                        <MenuButton
                            color={backgroundColor}
                            as={IconButton}
                            aria-label={translate("routeTemplates.routeTemplateListItem.toggleMenu")}
                            icon={<Icon icon="ellipsisVertical" />}
                            onClick={(event) => event.stopPropagation()}
                            variant="ghost"
                            size="lg"
                            data-testid={`toggle-route-template-item-menu${routeTemplate.id}`}
                        />
                        <Portal>
                            <MenuList>
                                <MenuItem
                                    data-testid="route-template-item-menu-delete"
                                    icon={<Icon icon="delete" />}
                                    onClick={(event: MouseEvent) => handleDelete(event)}
                                >
                                    {translate("routeTemplates.routeTemplateListItem.deleteRouteTemplate")}
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </RequirePermissions>
            </Td>
        </Tr>
    );
};
