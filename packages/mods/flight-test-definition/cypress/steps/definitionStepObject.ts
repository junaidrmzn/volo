import { generateText } from "@volocopter/text-editor-react";
import type { TestTypeEnum } from "@voloiq-typescript-api/ftd-types";
import type { MasterModel } from "@voloiq/flight-test-definition-api/v2";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { DefinitionFormPage } from "../pages/forms/definitionFormPageObject";
import { Select } from "../pages/utils/select";

type DefinitionData = {
    title: string;
    summary: string;
    scope: string;
    testArticle: string;
    testType: TestTypeEnum;
    masterModel: MasterModel;
    msn: string;
    testNumber: number;
    ata: number;
    revision: string;
    model: string;
};

export const DefinitionSteps = {
    addDefinition: (definitionData: DefinitionData) => {
        const { title, summary, scope, testArticle, masterModel, msn, ata, testNumber, revision, testType, model } =
            definitionData;

        DefinitionFormPage.titleTextEditor().clear().type(title);
        DefinitionFormPage.summaryTextEditor()
            .clear()
            .type(isJsonString(summary) ? generateText(JSON.parse(summary)) : summary);
        DefinitionFormPage.scopeTextEditor()
            .clear()
            .type(isJsonString(scope) ? generateText(JSON.parse(scope)) : scope);
        DefinitionFormPage.testArticleTextbox()
            .clear()
            .type(isJsonString(testArticle) ? generateText(JSON.parse(testArticle)) : testArticle);
        Select.selectByOptionName("Test Type:*", testType);
        Select.selectByOptionName("Master Model:*", masterModel);
        Select.selectByOptionName("MSN:*", msn);
        DefinitionFormPage.ataNumberbox().clear().type(ata.toString());
        DefinitionFormPage.testNumberbox().clear().type(testNumber.toString());
        DefinitionFormPage.modelTextBox().clear().type(model);
        DefinitionFormPage.revisionbox().clear().type(revision);
        DefinitionFormPage.saveButton().click();
    },
    editDefinition: (definitionData: Partial<DefinitionData>) => {
        const { title, summary, scope, testArticle, masterModel, msn, ata, testNumber, revision, testType } =
            definitionData;

        if (title) {
            DefinitionFormPage.titleTextEditor().clear().type(title);
        }
        if (summary) {
            DefinitionFormPage.summaryTextEditor().clear().type(summary);
        }
        if (scope) {
            DefinitionFormPage.scopeTextEditor().clear().type(scope);
        }
        if (testArticle) {
            DefinitionFormPage.testArticleTextbox().clear().type(testArticle);
        }
        if (testType) {
            Select.selectByOptionName("Test Type:*", testType);
        }
        if (masterModel) {
            Select.selectByOptionName("Master Model:*", masterModel);
        }
        if (msn) {
            Select.selectByOptionName("MSN:*", msn);
        }
        if (ata) {
            DefinitionFormPage.ataNumberbox().clear().type(ata.toString());
        }
        if (testNumber) {
            DefinitionFormPage.testNumberbox().clear().type(testNumber.toString());
        }
        if (revision) {
            DefinitionFormPage.revisionbox().clear().type(revision);
        }
        DefinitionFormPage.doneButton().click();
    },
};
