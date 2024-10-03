import type { Meta } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { Card } from "../card/Card";
import { PreviewSection, PreviewSectionItem } from "./PreviewSection";

const meta: Meta = {
    title: "Text-Layouts/Preview Section",
    decorators: [
        (Story) => {
            return (
                <I18nProvider>
                    <Story />
                </I18nProvider>
            );
        },
    ],
};
export default meta;

export const Basic = () => (
    <Card height="80vh" maxW="400px">
        <PreviewSection headerLabel="Metrics">
            <PreviewSectionItem label="Flight Date" text={new Date().toString()} fullWidth />
            <PreviewSectionItem label="Max. altitude" text="15m" />
            <PreviewSectionItem label="Max. velocity" text="24m/s" />
            <PreviewSectionItem label="Duration" text="3m. 11s" />
            <PreviewSectionItem label="Weight" text="643kg" />
        </PreviewSection>
        <PreviewSection headerLabel="Metrics">
            <PreviewSectionItem label="Flight Date" text={new Date().toString()} fullWidth />
            <PreviewSectionItem label="Max. altitude" text="15m" />
            <PreviewSectionItem label="Max. velocity" text="24m/s" />
            <PreviewSectionItem label="Duration" text="3m. 11s" />
            <PreviewSectionItem label="Weight" text="643kg" />
        </PreviewSection>
    </Card>
);
