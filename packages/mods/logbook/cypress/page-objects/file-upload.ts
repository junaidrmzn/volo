export const FileUploadPage = {
    attachmentInput: () => cy.get<HTMLInputElement>(`input[type="file"]`),
    sameFileExistsError: (fileName: string) =>
        cy.findByText(`A file with the name ${fileName} has already been added.`),
    emptyListLabel: () => cy.findByText("The list is empty."),
    addedFilesListFirstItem: () => cy.findByRole("list", { name: /selected log file entries/i }).first(),
    removeFileButton: () => cy.findByRole("button", { name: "Remove file entry" }),
    uploadButton: () => cy.findByRole("button", { name: "Upload" }),
    successMessage: () => cy.findByText("Files successfully uploaded"),
};
