import { Grid, GridItem } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { TextWithLabel } from "@voloiq/text-layouts";
import { FlighTestPlanIdList } from "./FlightTestPlanIdList";
import { useGeneralInformationTranslation } from "./translations/useGeneralInformationTranslation";

export type GeneralInformationBodyProps = {
    flightTestOrder: FlightTestOrder;
};

export const GeneralInformationBody = (props: GeneralInformationBodyProps) => {
    const { flightTestOrder } = props;
    const {
        missionTitle,
        ftoId,
        createTime,
        flightTestCategory,
        missionObjective,
        flightTestPlanIds,
        riskLevel,
        flightNumber,
        createdBy,
    } = flightTestOrder;
    const { t } = useGeneralInformationTranslation();
    const { formatDate } = useFormatDateTime();

    return (
        <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(4, 1fr)" gap={6}>
            <GridItem colSpan={2}>
                <TextWithLabel size="xs" unknownValueText="-" label={t("Mission Title")} text={missionTitle} />
            </GridItem>
            <TextWithLabel size="xs" unknownValueText="-" label={t("FTO ID")} text={ftoId} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Flt#")} text={flightNumber} />

            <TextWithLabel
                size="xs"
                unknownValueText="-"
                label={t("Risk Classification")}
                text={match(riskLevel)
                    .with("LOW", () => t("Low"))
                    .with("MEDIUM", () => t("Medium"))
                    .with("HIGH", () => t("High"))
                    .with("VERY_HIGH", () => t("Very High"))
                    .with(undefined, () => undefined)
                    .exhaustive()}
            />
            <TextWithLabel
                size="xs"
                unknownValueText="-"
                label={t("Flight Test Category")}
                text={match(flightTestCategory)
                    .with("Cat. 1", () => t("Cat. 1"))
                    .with("Cat. 2", () => t("Cat. 2"))
                    .with(undefined, () => undefined)
                    .exhaustive()}
            />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Date Created")} text={formatDate(createTime)} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Created By")} text={createdBy} />

            <GridItem colSpan={4} fontSize="xs">
                <TextWithLabel
                    size="xs"
                    unknownValueText="-"
                    label={t("Mission Objective")}
                    text={<EditorTextDisplay document={missionObjective} />}
                />
            </GridItem>

            <GridItem colSpan={4} fontSize="xs">
                <TextWithLabel
                    size="xs"
                    unknownValueText="-"
                    label={t("Flight Test Plan ID")}
                    text={<FlighTestPlanIdList flightTestPlanIds={flightTestPlanIds} />}
                />
            </GridItem>
        </Grid>
    );
};
