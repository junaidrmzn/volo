import { Route, useCreateRouteTemplate } from "@voloiq/flight-planning-api/v1";
import type { FormValues } from "@voloiq/form";
import { createFormControl, object, string } from "@voloiq/form";
import {
    useComputeAltitudeProfile,
    useDeleteRoute,
    useEditRoute,
    useGetRouteCsv,
    useGetRouteExcel,
    useGetRouteKml,
} from "../../../api-hooks";
import { useFlightPlanningTranslation } from "../../../translations";
import { useDisplayedRoutes } from "../../displayed-routes";
import { useRefocusCallback } from "../../overview/hooks";
import { useSelectedRoute } from "../../selected-route";

export const useRouteDetailsHeader = (route: Route) => {
    const { t: translate } = useFlightPlanningTranslation();
    const { selectRoute, unselectRoute } = useSelectedRoute();
    const { editRouteAsync } = useEditRoute();
    const { createRouteTemplate } = useCreateRouteTemplate();
    const { deleteRoute } = useDeleteRoute();
    const { getRouteKml } = useGetRouteKml();
    const { getRouteCsv } = useGetRouteCsv();
    const { getRouteExcel } = useGetRouteExcel();
    const { undisplayRoute } = useDisplayedRoutes();
    const { computeAltitudeProfileAsync } = useComputeAltitudeProfile(route.id);
    const { handleRefocusCallback } = useRefocusCallback();

    const createRouteEditSchema = object({
        name: string().label(translate("routePanel.name")).required(translate("common.requiredError")),
    });
    const FormControlRouteName = createFormControl<typeof createRouteEditSchema>();

    const createSaveAsRouteSchema = object({
        name: string().label(translate("routePanel.name")).required(translate("common.requiredError")),
    });
    const FormControlTemplateName = createFormControl<typeof createSaveAsRouteSchema>();

    const handleBackButton = () => {
        unselectRoute();
        handleRefocusCallback(route);
    };

    const handleEditName = (formData: FormValues<typeof createRouteEditSchema>) => {
        undisplayRoute(route);
        editRouteAsync({
            ...route,
            name: formData.name,
        }).then((newRoute) => {
            if (newRoute && newRoute.data) selectRoute(newRoute.data.id);
        });
    };

    const handleSaveAsTemplate = (formData: FormValues<typeof createSaveAsRouteSchema>) => {
        createRouteTemplate({
            routeId: route.id,
            name: formData.name,
            plannedBy: "voloiq-flightplanning",
        });
    };

    const handleDeleteRoute = () => {
        deleteRoute(route);
        undisplayRoute(route);
        handleRefocusCallback(route);
    };

    const handleExportRouteKml = () => {
        getRouteKml(route);
    };

    const handleExportRouteCsv = () => {
        getRouteCsv(route);
    };

    const handleExportRouteExcel = () => {
        getRouteExcel(route);
    };

    const handleComputeAltitudeProfile = async () => {
        await computeAltitudeProfileAsync();
    };

    return {
        handleSaveAsTemplate,
        handleDeleteRoute,
        handleExportRouteKml,
        handleExportRouteCsv,
        handleExportRouteExcel,
        FormControlRouteName,
        FormControlTemplateName,
        createSaveAsRouteSchema,
        createRouteEditSchema,
        handleEditName,
        handleComputeAltitudeProfile,
        handleBackButton,
    };
};
