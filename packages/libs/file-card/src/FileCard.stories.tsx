import type { Meta } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { FileCard } from "./FileCard";

const meta: Meta = {
    title: "File Card/File Card",
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic = () => (
    <FileCard onDownload={() => {}} fileName="Flight Test Request.pdf" fileSize={1390} uploadDate={new Date()} />
);

export const Uploading = () => (
    <FileCard onDownload={() => {}} fileName="Flight Test Request.pdf" fileSize={1390} isUploading />
);

export const Deletable = () => (
    <FileCard
        isDeletable
        onDelete={() => {}}
        onDownload={() => {}}
        fileName="Flight Test Request.pdf"
        fileSize={1390}
        uploadDate={new Date()}
    />
);

export const Readonly = () => (
    <FileCard
        onDownload={() => {}}
        fileName="Flight Test Request.pdf"
        fileSize={1390}
        uploadDate={new Date()}
        isReadonly
    />
);
