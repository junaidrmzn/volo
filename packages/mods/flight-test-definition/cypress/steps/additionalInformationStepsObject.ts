import { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";

export type AdditionalInformationStepsData = Pick<
    FlightTestDefinitionResponseBody,
    "safetyRecommendations" | "dataAnalysisPlan" | "specialEquipment"
>;

export const AdditionalInformationSteps = {
    addOrEditEnfgineeringtestProcedure: (additionalInfoData: AdditionalInformationStepsData) => {
        const { dataAnalysisPlan, safetyRecommendations, specialEquipment } = additionalInfoData;

        if (dataAnalysisPlan) {
            DefinitionDetailsPage.dataAnalysisTextEditor().clear().type(dataAnalysisPlan);
        }

        if (safetyRecommendations) {
            DefinitionDetailsPage.safetyRecommendationsTextEditor().clear().type(safetyRecommendations);
        }

        if (specialEquipment) {
            DefinitionDetailsPage.specialEquipmentTextEditor().clear().type(specialEquipment);
        }

        DefinitionDetailsPage.doneButton().click({ force: true });
    },
};
