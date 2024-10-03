import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import type {
    EngineeringTestProcedure,
    FTILink,
    Requirement,
    SpecialComment,
    WindchillRequirement,
} from "@voloiq/flight-test-definition-api/v1";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { FlightTestRequestSection } from "../../../flight-test-request/test-request-section/TestRequestSection";
import { AdditionalInformationChangesReview } from "./AdditionalInformationChangesReview";
import { EngineeringTestProcedureChangesReview } from "./EngineeringTestProcedureChangesReview";
import { FTIParametersChangesReview } from "./FtiParametersChangesReview";
import { RequirementsChangesReview } from "./RequirementsChangesReview";
import { SpecialCommentsChangesReview } from "./SpecialCommentsChangesReview";
import { useFlightTestRequestChangesReviewTranslation } from "./translations/useFlightTestRequestChangesReviewTranslation";

export type FlightTestRequestChangesReviewProps = {
    definition: FlightTestDefinitionResponseBody;
    manualRequirements?: Requirement[];
    windchillRequirements?: WindchillRequirement[];
    ftiLinks?: FTILink[];
    specialComments?: SpecialComment[];
    engineeringTestProcedures?: EngineeringTestProcedure[];
};

export const FlightTestRequestChangesReview = (props: FlightTestRequestChangesReviewProps) => {
    const {
        definition,
        ftiLinks = [],
        manualRequirements = [],
        windchillRequirements = [],
        specialComments = [],
        engineeringTestProcedures = [],
    } = props;
    const { t } = useFlightTestRequestChangesReviewTranslation();

    return (
        <Tabs size="sm" variant="underline">
            <TabList>
                <Tab>{t("General")}</Tab>
                <Tab>
                    {t("Requirements ({requirementsCount})", {
                        requirementsCount: manualRequirements.length + windchillRequirements.length,
                    })}
                </Tab>
                <Tab>{t("Engineering Test Procedures")}</Tab>
                <Tab>{t("FTI Parameters ({ftiParametersCount})", { ftiParametersCount: ftiLinks.length })}</Tab>
                <Tab>
                    {t("Special Comments ({specialCommentsCount})", { specialCommentsCount: specialComments.length })}
                </Tab>
                <Tab>{t("Additional Information")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <FlightTestRequestSection definition={definition} isReadonly />
                </TabPanel>
                <TabPanel>
                    <RequirementsChangesReview
                        manualRequirements={manualRequirements}
                        windchillRequirements={windchillRequirements}
                    />
                </TabPanel>
                <TabPanel>
                    <EngineeringTestProcedureChangesReview engineeringTestProcedures={engineeringTestProcedures} />
                </TabPanel>
                <TabPanel>
                    <FTIParametersChangesReview ftiLinks={ftiLinks} />
                </TabPanel>
                <TabPanel>
                    <SpecialCommentsChangesReview specialComments={specialComments} />
                </TabPanel>
                <TabPanel>
                    <AdditionalInformationChangesReview
                        dataAnalysisPlan={definition.dataAnalysisPlan}
                        specialEquipment={definition.specialEquipment}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
