import { VStack } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq-typescript-api/flight-planning-types/dist";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useFlightPlanningTranslation } from "../../../../translations";

type RouteOptionPreviewProps = {
    routeOption: RouteOption;
};

export const RouteOptionPreview = (props: RouteOptionPreviewProps) => {
    const { t } = useFlightPlanningTranslation();
    const { routeOption } = props;
    const { name, arrivalExternalVertiport, departureExternalVertiport, aircraftType, validForOperation } = routeOption;

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("common.general")}>
                <PreviewSectionItem label={t("routeOption.properties.name")} text={name} />
                <PreviewSectionItem label={t("routeOption.properties.aircraftType")} text={aircraftType} />
                <PreviewSectionItem
                    label={t("routeOption.properties.departureVertiport")}
                    text={departureExternalVertiport.name}
                />
                <PreviewSectionItem
                    label={t("routeOption.properties.arrivalVertiport")}
                    text={arrivalExternalVertiport.name}
                />
                <PreviewSectionItem
                    label={t("routeOption.properties.validForOperation")}
                    text={validForOperation ? t("routeOption.metaInfo.valid") : t("routeOption.metaInfo.invalid")}
                />
            </PreviewSection>
        </VStack>
    );
};
