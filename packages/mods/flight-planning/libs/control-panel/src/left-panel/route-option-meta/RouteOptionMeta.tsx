import { Box } from "@volocopter/design-library-react";
import { LayoutSection } from "@voloiq/flight-planning-components";
import { RouteOptionMetaItem } from "./RouteOptionMetaItem";
import { useRouteOptionMetaTranslation } from "./translations";

type RouteOptionMetaProps = {
    aircraftType?: string;
};
export const RouteOptionMeta = (props: RouteOptionMetaProps) => {
    const { aircraftType } = props;
    const { t } = useRouteOptionMetaTranslation();

    const weatherScenarios = [
        t("weatherScenario.type.standard"),
        t("weatherScenario.type.specific"),
        t("weatherScenario.type.live"),
    ];
    return (
        <Box w="348px" maxWidth="100%" left={0} pos="absolute">
            <LayoutSection firstLabel={t("scenario")} secondLabel={t("feasibility")}>
                <RouteOptionMetaItem label={t("weatherScenario.title")} text="" weatherScenarios={weatherScenarios} />

                <RouteOptionMetaItem label={t("aircraft")} text={aircraftType || t("notAvailable")} />

                <RouteOptionMetaItem label={t("settings.title")} text={t("settings.type.standard")} />
            </LayoutSection>
        </Box>
    );
};
