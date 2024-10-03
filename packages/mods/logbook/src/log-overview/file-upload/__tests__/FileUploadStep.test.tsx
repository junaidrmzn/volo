import { drop } from "@mswjs/data";
import { Steps } from "@volocopter/steps-react";
import { setupServer } from "msw/node";
import { useState } from "react";
import { configure, expectToHaveNoA11yViolations, render } from "@voloiq/testing";
import type { FileEntry } from "../../../libs/logbook/file-entry";
import { ServiceWrapper } from "../../../libs/logbook/mocks/TestWrapper";
import { setupServiceMockHandlers } from "../../../libs/logbook/mocks/msw/ServiceMock";
import { FileUploadStep } from "../../add/file-upload";

configure({ asyncUtilTimeout: 10_000 });

const { database, handlers } = setupServiceMockHandlers();

const { listen, resetHandlers, close } = setupServer(...handlers);

beforeAll(() => {
    listen();
});

afterEach(() => {
    drop(database);
    resetHandlers();
});

afterAll(() => {
    close();
});

const FileUploadStepWrapper = () => {
    const [entries, setEntries] = useState<FileEntry[]>([]);
    return <FileUploadStep fileEntries={entries} onFileEntriesChange={setEntries} />;
};

test("Form has no a11y violations", async () => {
    const { container } = render(
        <ServiceWrapper>
            <Steps variant="labeled" backLabel="Back" nextLabel="Next" initialStep={0}>
                <Steps.Step>
                    <FileUploadStepWrapper />
                </Steps.Step>
            </Steps>
        </ServiceWrapper>
    );

    await expectToHaveNoA11yViolations(container);
}, 30_000);
