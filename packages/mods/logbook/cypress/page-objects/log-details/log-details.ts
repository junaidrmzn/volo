export const LogDetailsPage = {
    heading: () =>
        cy.findByRole("heading", {
            name: /log - .+/i,
        }),
    exportButton: () => cy.findByRole("button", { name: /export/i }),
    addFileButton: () => cy.findByRole("link", { name: /add file/i }),
    backButton: () => cy.findByRole("button", { name: /return to list/i }),
    fileList: () => cy.findByTestId("file-list"),
    fileListItems: () => LogDetailsPage.fileList().findAllByRole("listitem"),
};

export const LogFileVideoModal = {
    modalWindow: () => cy.findByRole("dialog"),
    video: () => LogFileVideoModal.modalWindow().get("video"),
    heading: (fileName: string) => LogFileVideoModal.modalWindow().findByText(`${fileName} is playing`),
    closeButton: () => LogFileVideoModal.modalWindow().findByRole("button", { name: /close/i }),
};
