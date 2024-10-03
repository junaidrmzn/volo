import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { AdditionalInformationSection } from "./additional-information/AdditionalInformationSection";
import { EngineeringTestProcedure } from "./engineering-test-procedure/EngineeringTestProcedure";
import { FtiParametersSection } from "./fti-parameters/FtiParametersSection";
import { FtiParametersTab } from "./fti-parameters/fti-parameters-tab/FtiParametersTab";
import { Requirements } from "./requirements/Requirements";
import { RequirementsTab } from "./requirements/RequirementsTab";
import { SpecialCommentsSection } from "./special-comments/SpecialCommentsSection";
import { FlightTestRequestSection } from "./test-request-section/TestRequestSection";
import { useFlightTestRequestTranslation } from "./translations/useFlightTestRequestTranslation";

export type FlightTestRequestProps = {
    definition: FlightTestDefinitionResponseBody;
    requirementsCount?: number;
    ftiParameterCount?: number;
};

export const FlightTestRequest = (props: FlightTestRequestProps) => {
    const { definition, requirementsCount, ftiParameterCount } = props;
    const { t } = useFlightTestRequestTranslation();

    const showFtiParametersTab = definition.masterModel === "VC2-1";

    return (
        <Tabs size="sm" variant="underline" isLazy>
            <TabList>
                <Tab>{t("General")}</Tab>
                <RequirementsTab requirementsCount={requirementsCount} />
                <Tab>{t("Engineering Test Procedures")}</Tab>
                {showFtiParametersTab && <FtiParametersTab ftiParametersCount={ftiParameterCount} />}
                <Tab>{t("Special Comments")}</Tab>
                <Tab>{t("Additional Information")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <FlightTestRequestSection
                        definition={definition}
                        isReadonly={definition.releasedRevisions?.includes(definition.revision)}
                    />
                </TabPanel>
                <TabPanel>
                    <Requirements />
                </TabPanel>
                <TabPanel>
                    <EngineeringTestProcedure definitionId={definition.id} />
                </TabPanel>
                {showFtiParametersTab && (
                    <TabPanel>
                        <FtiParametersSection definitionId={definition.id} />
                    </TabPanel>
                )}
                <TabPanel>
                    <SpecialCommentsSection />
                </TabPanel>
                <TabPanel>
                    <AdditionalInformationSection definitionId={definition.id} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
