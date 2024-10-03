import { generateText } from "@volocopter/text-editor-react";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { GeneralInformationType } from "../../component/flight-test-order/test-mission/general/GeneralTypes";
import { FlightTestOrderGeneralInformationFragment } from "../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderGeneralInformationFragment";
import { Select } from "../../pages/utils/select";

export const generalInformationRiskClassifications = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    VERY_HIGH: "Very High",
};

export const GeneralInformationSteps = {
    fillInGeneralInformationModalFormAndSubmit: (
        generalInformation: Pick<
            GeneralInformationType,
            "missionTitle" | "flightNumber" | "flightTestCategory" | "riskLevel" | "missionObjective"
        >
    ) => {
        const { missionTitle, flightNumber, riskLevel, flightTestCategory, missionObjective } = generalInformation;

        FlightTestOrderGeneralInformationFragment.missionTitleTextBox().clear().type(missionTitle);
        FlightTestOrderGeneralInformationFragment.flightNumberTextBox().clear().type(flightNumber);
        Select.selectByOptionName("Flight Test Category:", flightTestCategory);
        Select.selectByOptionName("Risk Classification:", generalInformationRiskClassifications[riskLevel]);
        FlightTestOrderGeneralInformationFragment.missionObjectiveTextEditor()
            .clear()
            .type(isJsonString(missionObjective) ? generateText(JSON.parse(missionObjective)) : missionObjective);

        FlightTestOrderGeneralInformationFragment.doneButton().click();
    },
};
