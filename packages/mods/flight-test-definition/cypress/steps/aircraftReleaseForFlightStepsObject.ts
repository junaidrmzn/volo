import { generateText } from "@volocopter/text-editor-react";
import type { AircraftReleaseConfiguration } from "@voloiq/flight-test-definition-api/v1";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { EditAircraftReleaseConfigurationsModalFragment } from "../pages/flight-test-order/flight-test-order-details/page-fragments/editAircraftReleaseConfigurationsModalFragment";
import { EditAircraftReleaseOtherInformationModalFragment } from "../pages/flight-test-order/flight-test-order-details/page-fragments/editAircraftReleaseOtherInformationModalFragment";
import { DateTimePicker } from "../pages/utils/datepicker";

export const AircraftReleaseForFlightSteps = {
    fillInConfigurationsModalFormAndSubmit: (configurations: AircraftReleaseConfiguration[]) => {
        for (const [index, configuration] of configurations.entries()) {
            EditAircraftReleaseConfigurationsModalFragment.rowFormField(index, "Required:")
                .clear()
                .type(configuration.required);
            EditAircraftReleaseConfigurationsModalFragment.rowFormField(index, "Status:")
                .clear()
                .type(configuration.status);
            if (configuration.commentOnDeviation) {
                EditAircraftReleaseConfigurationsModalFragment.rowFormField(index, "Comment to Deviations:")
                    .clear()
                    .type(configuration.commentOnDeviation);
            }
            if (configuration.accept) {
                EditAircraftReleaseConfigurationsModalFragment.rowFormField(index, "Accept?:").check({
                    force: true,
                });
            } else {
                EditAircraftReleaseConfigurationsModalFragment.rowFormField(index, "Accept?:").uncheck({
                    force: true,
                });
            }
        }

        EditAircraftReleaseConfigurationsModalFragment.doneButton().click();
    },
    fillInGeneralInformationModalFormAndSubmit: (temporaryLimitations: string, referenceSubstantiation: string) => {
        EditAircraftReleaseOtherInformationModalFragment.temporaryLimitationsTextEditor()
            .clear()
            .type(
                isJsonString(temporaryLimitations)
                    ? generateText(JSON.parse(temporaryLimitations))
                    : temporaryLimitations
            );
        EditAircraftReleaseOtherInformationModalFragment.referenceSubstantiationTextEditor()
            .clear()
            .type(
                isJsonString(referenceSubstantiation)
                    ? generateText(JSON.parse(referenceSubstantiation))
                    : referenceSubstantiation
            );
        EditAircraftReleaseOtherInformationModalFragment.doneButton().click();
    },

    fillInGeneralInformationV2ModalFormAndSubmit: (
        aircraftConfigurationStatus: string,
        date: Date,
        issuedApprovedLimitations: string
    ) => {
        EditAircraftReleaseOtherInformationModalFragment.aircraftConfigurationStatus()
            .clear()
            .type(aircraftConfigurationStatus);

        EditAircraftReleaseOtherInformationModalFragment.date().click();
        DateTimePicker.selectDate(date);
        EditAircraftReleaseOtherInformationModalFragment.issuedApprovedlimitations()
            .clear()
            .type(issuedApprovedLimitations);
        EditAircraftReleaseOtherInformationModalFragment.doneButton().click();
    },
};
