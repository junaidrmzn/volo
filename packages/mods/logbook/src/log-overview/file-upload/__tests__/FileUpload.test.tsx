import { Button, Text } from "@volocopter/design-library-react";
import { Steps } from "@volocopter/steps-react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { resolve } from "node:path";
import { useState } from "react";
import type { LogbookFile } from "@voloiq/logbook-api/v6";
import { configure, render, screen, userEvent, waitFor, within } from "@voloiq/testing";
import type { FileEntry } from "../../../libs/logbook/file-entry";
import { ServiceWrapper } from "../../../libs/logbook/mocks/TestWrapper";
import { anyLogbookFile, anyLogbookFileUploadUrl } from "../../../libs/logbook/mocks/msw/LogbookFileMock";
import { createFile } from "../../__tests__/testing";
import { CancelUploadModal } from "../CancelUploadModal";
import { FileUploadTemplate } from "../FileUpload";
import { UploadProgress } from "../UploadProgress";
import { useUploadFiles } from "../useUploadFiles";

configure({ asyncUtilTimeout: 10_000 });

const getFileUploadLinkHandler = rest.get(
    `${BACKEND_BASE_URL}/logs/:logId/upload-link`,
    (_request, response, context) =>
        response(
            context.status(200),
            context.json({
                data: anyLogbookFileUploadUrl(),
            })
        )
);

const fileUploadHandler = rest.put(`https://*.blob.core.windows.net/*`, (_request, response, context) =>
    response(context.status(201), context.json({}))
);

const filePostHandler = (withDelay = false) =>
    rest.post(`${BACKEND_BASE_URL}/logs/:logId/files`, (_request, response, context) =>
        response(
            context.delay(withDelay ? 1000 : 0),
            context.status(201),
            context.json({
                data: anyLogbookFile(),
            })
        )
    );

const { listen, resetHandlers, close, use } = setupServer(filePostHandler());

beforeAll(() => {
    listen();
});

afterEach(() => {
    resetHandlers();
});

afterAll(() => {
    close();
});

type FileUploadTestComponentProps = {
    existingFiles?: LogbookFile[];
};

const FileUploadTestComponent: FCC<FileUploadTestComponentProps> = (props) => {
    const { existingFiles = [] } = props;
    const [entries, setEntries] = useState<FileEntry[]>([]);
    const [uploadCancelled, setUploadCancelled] = useState(false);
    const [cancelUploadModalIsOpen, setCancelUploadModalIsOpen] = useState(false);
    const { state, uploadState, uploadFiles } = useUploadFiles({
        cancellationToastDescription: "The remaining files were not uploaded.",
        uploadCancelled,
    });

    const handleCancel = () => setUploadCancelled(true);

    return (
        <>
            <CancelUploadModal
                descriptionText="The log will still be accessible with the files that have already been uploaded."
                isOpen={cancelUploadModalIsOpen}
                onCancel={() => setCancelUploadModalIsOpen(false)}
                onConfirm={handleCancel}
            />
            <FileUploadTemplate existingFiles={existingFiles} fileEntries={entries} onFileEntriesChange={setEntries} />
            {!uploadCancelled && (
                <>
                    <UploadProgress onCancel={() => setCancelUploadModalIsOpen(true)} uploadState={uploadState} />
                    <Button onClick={() => uploadFiles({ logId: "1", fileEntries: entries })}>Upload</Button>
                    <Text role="status" aria-label="statusText">
                        {state}
                    </Text>
                </>
            )}
        </>
    );
};

const selectFile = async (file: File) => {
    const fileInput = document.querySelector<HTMLInputElement>(`input[type="file"]`);
    userEvent.upload(fileInput!, file);

    await screen.findByText(file.name);
    const addButton = screen.getByRole("button", {
        name: "Add",
    });
    userEvent.click(addButton);
};

const assertFileExists = async (file: File) => {
    const logEntryList = screen.getByRole("list", {
        name: "Selected log file entries",
    });
    await within(logEntryList).findByText(file.name);
    await waitFor(() => {
        const entry = within(logEntryList)
            .getAllByRole("listitem")
            .find((listitem) => listitem.textContent?.trim().startsWith(file.name));
        expect(entry).toBeVisible();
    });
};

// TODO: this test is flaky, migrate it to Cypress
// Example: https://dev.azure.com/volocopter/af782813-e94c-4445-984d-b1e309411656/_apis/build/builds/40374/logs/15
// Unable to find an element with the text: The remaining files were not uploaded...
xtest("User can cancel an upload", async () => {
    use(getFileUploadLinkHandler);
    use(fileUploadHandler);
    use(filePostHandler(true));

    render(
        <ServiceWrapper>
            <Steps variant="labeled" backLabel="Back" nextLabel="Next" initialStep={0}>
                <Steps.Step>
                    <FileUploadTestComponent />
                </Steps.Step>
            </Steps>
        </ServiceWrapper>
    );

    const logEntriesData = {
        MESH: createFile(resolve(__dirname, "../../__tests__/testdata//mesh.binlog"), "mesh.binlog"),
        FC: createFile(resolve(__dirname, "../../__tests__/testdata//fc.binlog"), "fc.binlog"),
    };

    await selectFile(logEntriesData.MESH);
    await selectFile(logEntriesData.FC);

    await assertFileExists(logEntriesData.MESH);
    await assertFileExists(logEntriesData.FC);

    const createButton = screen.getByRole("button", {
        name: "Upload",
    });
    userEvent.click(createButton);

    await waitFor(() => {
        expect(screen.getByText("Uploading file: mesh.binlog (1/2)", { exact: false })).toBeVisible();
    });

    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
        expect(screen.getByText("Cancel Upload?")).toBeVisible();
    });

    expect(
        screen.getByText("The log will still be accessible with the files that have already been uploaded.")
    ).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "Cancel Upload" }));

    await waitFor(() => {
        expect(screen.getByText("The remaining files were not uploaded.")).toBeVisible();
    });
}, 30_000);
